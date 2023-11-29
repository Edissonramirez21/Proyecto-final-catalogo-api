import asyncHandler from "express-async-handler";
import Color from "../model/Color.js";


//@desc crear nuevo color
//@route POST /api/v1/colors
//@access Private/Admin
export const CrearNewColorController = asyncHandler(async(req, res) => {
    const {nombre} = req.body;
    //Color existe
    const colorFound = await Color.findOne({nombre})
    if(colorFound){
        throw new Error("El Color ya existe")
    };
    //Crear 
    const colores = await Color.create({
        nombre: nombre.toLowerCase(),
        usuario: req.userAuthId,
    });
    res.json({
        status: "Exitoso",
        message: "Un Nuevo Color ha sido agregado exitosamente",
        colores,
    });
});


//@desc obtener los colores
//@route GET /api/v1/colores
//@access Public
export const ObtenerAllColorsController = asyncHandler(async(req, res) => {
    const colores = await Color.find();
    res.json({
        status: "Exitoso",
        message: "Los Colores se han solicitado correctamente",
        colores,
    });
});

//@desc obtener una solo color
//@route GET /api/v1/colors/:id
//@access Public
export const ObtenerOnlyColorController = asyncHandler(async(req, res) => {
    const colores = await Color.findById(req.params.id);
    res.json({
        status: "Exitoso",
        message: "El Color se solicito correctamente",
        colores,
    });
});


//@desc Update color
//@route GET /api/v1/colors/:id
//@access Private/Admin
export const ActualizarColorController = asyncHandler(async(req, res) => {
    const { nombre } = req.body;
    
    //update
    const color = await Color.findByIdAndUpdate(req.params.id, {
        nombre, 
    },
    {
        new: true,
    }
    );
    res.json({
        status: "Exitoso",
        message: "El Color se actualizo correctamente",
        color,
    });
});

//@desc Delete Color
//@route DELETE /api/v1/colors/:id
//@access Private/Admin
export const DeleteColorController = asyncHandler(async(req, res) => {
    await Color.findByIdAndDelete(req.params.id);
    res.json({
        status: "Exitoso",
        message: "El Color se elimino Correctamente",
    });
});



