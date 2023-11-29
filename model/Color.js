import mongoose from "mongoose";
const Schema = mongoose.Schema;

const colorshema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},
        { timestamps: true }, 
        
);

//Compilar el Schema al modelo
const Color = mongoose.model('Color', colorshema);

export default Color;