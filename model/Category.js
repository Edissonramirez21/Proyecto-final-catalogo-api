import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categoriashema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    imagenes: {   
        
            type: String,
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
const Categoria = mongoose.model('Categoria', categoriashema);

export default Categoria;