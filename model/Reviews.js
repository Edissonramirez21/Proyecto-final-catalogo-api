import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reviewshema = new Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "La Reseña debe pertenecer a un producto"],
    },
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: [true, "La Reseña debe pertenecer a un producto"],
    },
    mensaje: {
        type: String,
        required: [true, "Por favor, añada un mensaje"],
    },
    rating: {
        type: Number,
        required: [true, "Por favor, añada una puntuación entre 1 y 5"],
        min: 1,
        max: 5,
    },
},
        { timestamps: true }, 
        
);

//Compilar el Schema al modelo
const Review = mongoose.model('Review', reviewshema);

export default Review;