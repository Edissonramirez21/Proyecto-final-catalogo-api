import asyncHandler from "express-async-handler";
import Subcategoria from "../model/Subcategory.js";


//@desc crear nueva subcategoria 
//@route POST /api/v1/subcategorias
//@access Private/Admin
export const CrearSubCTGController = asyncHandler(async(req, res) => {
    const {nombre} = req.body;
    //categoria existe
    const subcategoriaFound = await Subcategoria.findOne({nombre})
    if(subcategoriaFound){
        throw new Error("La Subcategoria ya existe")
    };
    //Crear 
    const subcategorias = await Subcategoria.create({
        nombre: nombre.toLowerCase(),
        usuario: req.userAuthId,
    });
    res.json({
        status: "Exitoso",
        message: "La Subcategoria ha sido creada exitosamente",
        subcategorias,
    });
});


//@desc obtener las  subcategorias
//@route GET /api/v1/subcategorias
//@access Public
export const ObtenerTodasSubCTGController = asyncHandler(async(req, res) => {
    const subcategorias = await Subcategoria.find();
    res.json({
        status: "Exitoso",
        message: "Las Subcategorias se obtuvieron correctamente",
        subcategorias,
    });
});

//@desc obtener una sola subcategoria
//@route GET /api/v1/subcategorias/:id
//@access Public
export const ObtenerOnlySubCTGController = asyncHandler(async(req, res) => {
    const subcategorias = await Subcategoria.findById(req.params.id);
    res.json({
        status: "Exitoso",
        message: "La Subcategoria se solicito exitosamente",
        subcategorias,
    });
});


//@desc Update subcategoria
//@route GET /api/v1/subcategorias/:id
//@access Private/Admin
export const ActualizarSubCTGController = asyncHandler(async(req, res) => {
    const { nombre } = req.body;
    
    //update
    const subcategoria = await Subcategoria.findByIdAndUpdate(req.params.id, {
        nombre, 

    },
    {
        new: true,
    }
    );
    res.json({
        status: "Exitoso",
        message: "La Subcategoria se actualizo correctamente",
        subcategoria,
    });
});

//@desc Delete subcategoria
//@route DELETE /api/v1/subcategorias/:id
//@access Private/Admin
export const DeleteSubCTGController = asyncHandler(async(req, res) => {
    await Subcategoria.findByIdAndDelete(req.params.id);
    res.json({
        status: "Exitoso",
        message: "La Subcategoria ha sido eliminada exitosamente",
    });
});



