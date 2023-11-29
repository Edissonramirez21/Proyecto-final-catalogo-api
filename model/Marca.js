import mongoose from "mongoose";
const Schema = mongoose.Schema;

const marcashema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    productos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Producto",
        },
    ],
},
        { timestamps: true }, 
        
);

//Compilar el Schema al modelo
const Marca= mongoose.model('Marca', marcashema);

export default Marca;