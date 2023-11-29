import asyncHandler from "express-async-handler";
import Producto from "../model/Product.js";
import Categoria from "../model/Category.js";
import Marca from "../model/Marca.js";
import Subcategoria from "../model/Subcategory.js";

//@desc Crear nuevo Producto
//@route POST /api/v1/products
//@access Private/Admin
export const CrearProductoController = asyncHandler(async(req, res) => {
    console.log(req.body);
    const { nombre, descripcion, marca, categoria, subcategoria, tallas, tallasZapatos, colores, contenido, precio, cantidadtotal } = req.body;
   const convertedImages = req.files.map((file) => file?.path);
  //Producto existe
  const productExists = await Producto.findOne({ nombre });
  if (productExists) {
    throw new Error("El Producto ya existe");
  } 
    //Encontrar la categoria
    const categoriaFound = await Categoria.findOne({
         nombre: categoria,
    });
    if (!categoriaFound) {
        throw new Error(
            "La Categoria no ha sido encontrada, por favor crea la categoria primero o verifica el nombre de la categoria"
        );
    };


    //Encontrar la subcategoria
    const subcategoriaFound = await Subcategoria.findOne({
         nombre: subcategoria.toLowerCase(),
    });
    if (!subcategoriaFound) {
        throw new Error(
            "La Subcategoria no ha sido encontrada, por favor creala primero o verifica el nombre de la subcategoria"
        );
    };


     //Producto existente
     const productoExiste = await Producto.findOne({ nombre});
     if (productoExiste) {
         throw new Error("El Producto ya existe");
     };
     //Encontrar la marca
     const marcaFound = await Marca.findOne({
          nombre: marca.toLowerCase(),
     });
     if (!marcaFound) {
         throw new Error(
             "La Marca no ha sido encontrada, por favor creala primero o verifica el nombre de la marca"
         );
     };


    //Crear el producto
    const producto = await Producto.create({
         nombre,
         descripcion, 
         marca, 
         categoria, 
         subcategoria,
         tallas, 
         tallasZapatos,
         colores, 
         contenido,
         usuario: req.userAuthId,
         precio, 
         cantidadtotal,
         imagenes: convertedImages,
    });
    //Introducir el producto en la categoria
    categoriaFound.productos.push(producto._id);
    //Volver a guardar
    await categoriaFound.save();
    //Enviar Respuesta

    //Introducir el producto en la subcategoria
    subcategoriaFound.productos.push(producto._id);
    //Volver a guardar
    await subcategoriaFound.save();
    //Enviar Respuesta

    //Introducir el producto en la marca
    marcaFound.productos.push(producto._id);
    //Volver a guardar
    await marcaFound.save();
    //Enviar Respuesta


    res.json({
        status: "Exitoso",
        message: "El Producto ha sido creado correctamente",
        producto,
    });
});




//@desc Obtener todos los Productos
//@route POST /api/v1/products
//@access Private/Admin
export const ObtenerProductosController = asyncHandler(async(req, res) => {
    console.log(req.query);
    //Consulta
    let productQuery = Producto.find();
    //busqueda por nombre
    if (req.query.nombre) {
        productQuery = productQuery.find({
            nombre: { $regex: req.query.nombre, $options: "i"}
        });
    }
    //filtrar por marca
    if (req.query.marca) {
        productQuery = productQuery.find({
            marca: { $regex: req.query.marca, $options: "i"}
        });
    }
    //filtrar por categoria
    if (req.query.categoria) {
        productQuery = productQuery.find({
            categoria: { $regex: req.query.categoria, $options: "i"}
        });
    }
    //filtrar por subcategoria
    if (req.query.subcategoria) {
        productQuery = productQuery.find({
            subcategoria: { $regex: req.query.subcategoria, $options: "i"}
        });
    }
    //filtrar por color
    if (req.query.colores) {
        productQuery = productQuery.find({
            colores: { $regex: req.query.colores, $options: "i"}
        });
    }
    //filtrar por tallas
    if (req.query.tallas) {
        productQuery = productQuery.find({
            tallas: { $regex: req.query.tallas, $options: "i"}
        });
    }
    //filtrar por tallas de Zapatos
    if (req.query.tallasZapatos) {
        productQuery = productQuery.find({
            tallasZapatos: { $regex: req.query.tallasZapatos, $options: "i"}
        });
    }
    //filtrar por rango de precios 
    if (req.query.precio) {
        const RangoPrecio = req.query.precio.split("-");
        //gte: mayor o igual
        //lte: menor o igual que
        productQuery = productQuery.find({
            precio:{ $gte: RangoPrecio[0], $lte: RangoPrecio[1] },
        });
    }
    //Paginacion
    //Pagina
    const Pagina = parseInt(req.query.Pagina) ? parseInt(req.query.Pagina) : 1;
    //Limite
    const limite = parseInt(req.query.limite) ? parseInt(req.query.limite) : 10;
    //startIndex
    const startIndex = (Pagina -1) * limite;
    //endIndex
    const endIndex = Pagina * limite;
    //total
    const total = await Producto.countDocuments();

    productQuery = productQuery.skip(startIndex).limit(limite);

    //Resultados Paginacion
    const pagination = {};
    if (endIndex < total) {
        pagination.next = {
            Pagina: Pagina + 1,
            limite,
        };
    }
    if (startIndex > 0) {
        pagination.prev = {
            Pagina: Pagina - 1,
            limite,
        }
    }

    //espera la consulta
    const productos = await productQuery.populate("reseñas");
    res.json({
        status: "Exitoso",
        total,
        results: productos.length,
        pagination,
        message: "Los Productos solicitados correctamente",
        productos,
    });
});

//@desc Obtener un solo Producto
//@route POST /api/v1/products/:id
//@access Public

export const ObtenerOnlyProductoController = asyncHandler(async(req, res) => {
    const productaso = await Producto.findById(req.params.id).populate("reseñas");
    if(!productaso){
        throw new Error("El Producto no ha sido encontrado")
    }
    res.json({
        status: "Exitoso",
        message: "El producto se solicito correctamente",
        productaso,
    });
});

//@desc Actualizar producto
//@route POST /api/v1/products/:id/actualizar
//@access Private/Admin
export const ActualizarProductoController = asyncHandler(async(req, res) => {
    const { nombre, descripcion, marca, categoria, subcategoria, tallas, tallasZapatos, colores, contenido, usuario, precio, cantidadtotal } = req.body;
    
    //update
    const producto = await Producto.findByIdAndUpdate(req.params.id, {
        nombre, 
        descripcion, 
        marca, 
        categoria, 
        subcategoria, 
        tallas, 
        tallasZapatos, 
        colores, 
        contenido, 
        usuario, 
        precio, 
        cantidadtotal,

    },
    {
        new: true,
    }
    );
    res.json({
        status: "Exitoso",
        message: "El producto se actualizo correctamente",
        producto,
    });
});


//@desc Eliminar producto
//@route POST /api/v1/products/:id/eliminar
//@access Private/Admin
export const DeleteProductoController = asyncHandler(async(req, res) => {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({
        status: "Exitoso",
        message: "El producto se ha eliminado correctamente",
    });
});

