import mongoose from "mongoose";
const Schema = mongoose.Schema;

const usershema = new Schema({
    namescompletos: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contraseña: {
        type: String,
        required: true,
    },
    pedidos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pedido",
        }
    ],
    listadeseos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Listadeseo",
        },
    ],
    isAdmin: {
        type: Boolean,
        default: false,
    },
    hasdireccionenvio: {
        type: Boolean,
        default: false,
    },
    direccionenvio: {
        nombre: {
            type: String,
        },
        apellido: {
            type: String,
        },
        direccion: {
            type: String,
        },
        ciudad: {
            type: String,
        },
        codigopostal: {
            type: String,
        },
        providencia: {
            type: String,
        },
        pais: {
            type: String,
        },
        telefono: {
            type: String,
        },
    },

},
        {
            timestamps: true,
        }
);

//Compilar el Schema al modelo
const Usero = mongoose.model('User', usershema);

export default Usero;