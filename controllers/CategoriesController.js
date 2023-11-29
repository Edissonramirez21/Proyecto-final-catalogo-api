import asyncHandler from "express-async-handler";
import Categoria from "../model/Category.js";


//@desc crear nueva categoria 
//@route POST /api/v1/categorias
//@access Private/Admin
export const CrearCategoriaController = asyncHandler(async(req, res) => {
    const {nombre} = req.body;
    //categoria existe
    const categoriaFound = await Categoria.findOne({nombre})
    if(categoriaFound){
        throw new Error("La Categoria ya existe")
    };
    //Crear 
    const categorias = await Categoria.create({
        nombre: nombre.toLowerCase(),
        usuario: req.userAuthId,
        imagenes: req.file.path,
    });
    res.json({
        status: "Exitoso",
        message: "La Categoria ha sido creada exitosamente",
        categorias,
    });
});


//@desc obtener las  categoria 
//@route GET /api/v1/categorias
//@access Public
export const ObtenerCategoriasController = asyncHandler(async(req, res) => {
    const categorias = await Categoria.find();
    res.json({
        status: "Exitoso",
        message: "Las Categorias se obtuvieron correctamente",
        categorias,
    });
});

//@desc obtener una sola categoria
//@route GET /api/v1/categorias/:id
//@access Public
export const ObtenerOnlyCategoriaController = asyncHandler(async(req, res) => {
    const categorias = await Categoria.findById(req.params.id);
    res.json({
        status: "Exitoso",
        message: "La Categoria se solicito exitosamente",
        categorias,
    });
});


//@desc Update categoria
//@route GET /api/v1/categorias/:id
//@access Private/Admin
export const ActualizarCategoriaController = asyncHandler(async(req, res) => {
    const { nombre } = req.body;
    
    //update
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, {
        nombre, 

    },
    {
        new: true,
    }
    );
    res.json({
        status: "Exitoso",
        message: "La Categoria se actualizo correctamente",
        categoria,
    });
});

//@desc Delete categoria
//@route DELETE /api/v1/categorias/:id
//@access Private/Admin
export const DeleteCategoriaController = asyncHandler(async(req, res) => {
    await Categoria.findByIdAndDelete(req.params.id);
    res.json({
        status: "Exitoso",
        message: "La Categoria ha sido eliminada exitosamente",
    });
});



