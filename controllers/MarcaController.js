import asyncHandler from "express-async-handler";
import Marca from "../model/Marca.js";


//@desc crear nueva marca
//@route POST /api/v1/marca
//@access Private/Admin
export const CrearMarcaController = asyncHandler(async(req, res) => {
    const {nombre} = req.body;
    //Marca existe
    const brandFound = await Marca.findOne({nombre})
    if(brandFound){
        throw new Error("La Marca ya existe")
    };
    //Crear 
    const marcas = await Marca.create({
        nombre: nombre.toLowerCase(),
        usuario: req.userAuthId,
    });
    res.json({
        status: "Exitoso",
        message: "Una Nueva Marca ha sido agregada exitosamente",
        marcas,
    });
});


//@desc obtener las  marcas
//@route GET /api/v1/marca
//@access Public
export const ObtenerAllMarcasController = asyncHandler(async(req, res) => {
    const marcas = await Marca.find();
    res.json({
        status: "Exitoso",
        message: "Las Marcas se han solicitado correctamente",
        marcas,
    });
});

//@desc obtener una sola marca
//@route GET /api/v1/marca/:id
//@access Public
export const ObtenerOnlyMarcaController = asyncHandler(async(req, res) => {
    const marcas = await Marca.findById(req.params.id);
    res.json({
        status: "Exitoso",
        message: "La Marca se solicito correctamente",
        marcas,
    });
});


//@desc Update brand
//@route GET /api/v1/marca/:id
//@access Private/Admin
export const ActualizarMarcaController = asyncHandler(async(req, res) => {
    const { nombre } = req.body;
    
    //update
    const brand = await Marca.findByIdAndUpdate(req.params.id, {
        nombre, 
    },
    {
        new: true,
    }
    );
    res.json({
        status: "Exitoso",
        message: "La Marca se actualizo correctamente",
        brand,
    });
});

//@desc Delete Marca
//@route DELETE /api/v1/marca/:id
//@access Private/Admin
export const DeleteMarcaController = asyncHandler(async(req, res) => {
    await Marca.findByIdAndDelete(req.params.id);
    res.json({
        status: "Exitoso",
        message: "La Marca ha sido eliminada exitosamente",
    });
});



