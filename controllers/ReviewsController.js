import asyncHandler from "express-async-handler";
import Producto from "../model/Product.js";
import Review from "../model/Reviews.js";

//@desc Crear nueva reseña 
//@route POST /api/v1/review
//@access Private/Admin
export const CrearReviewController = asyncHandler(async(req, res) =>{
    const {producto, mensaje, rating} = req.body;
    //1. Encontrar el producto
    const { productoID } = req.params;
    const productoFound = await Producto.findById(productoID).populate("reseñas");
    if (!productoFound) {
        throw new Error("Producto no encontrado");
    }
    //Verificar si el usuario ya reseño el producto
    const hasReviewed = productoFound?.reseñas?.find((reseña) => {
        return reseña?.usuario?.toString() === req?.userAuthId?.toString();
    });
    if (hasReviewed) {
        throw new Error("Usted ya ha opinado sobre este producto");
    }
    //Crear review
    const reseña = await Review.create({
        mensaje,
        rating,
        producto: productoFound?._id,
        usuario: req.userAuthId,
    });
    //Impulsa reseña en el producto encontrado
    productoFound.reseñas.push(reseña?._id)
    //Volver a guardar
    await productoFound.save();
    res.status(201).json({
        success: true,
        message: "La Reseña se realizo con exito"
    });

});

