import mongoose from "mongoose";
const Schema = mongoose.Schema;

const subcategoriashema = new Schema({
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
            default: "",
            //required: true,
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
const Subcategoria = mongoose.model('Subcategoria', subcategoriashema);

export default Subcategoria;