import mongoose from "mongoose";
const Schema = mongoose.Schema;
//Generar ramdom numeros para el pedido
const ramdomTXT = Math.random().toString(36).substring(7).toLocaleUpperCase();
const ramdomNumeros = Math.floor(1000 + Math.random() * 90000)
const pedidoschema = new Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    pedidoitems: [
        {
            type: Object,
            required: true,
        },
    ],
    direccionenvio: {
        type: Object,
        required: true,
    },
    numeropedido: {
        type: String,
        default: ramdomTXT + ramdomNumeros
    },
    //Para Stripe pago
    estadopago: {
        type: String,
        default: "No pagado",
    },
    metododepago: {
        type: String,
        default: "No especificado",
    },
    preciototal: {
        type: Number,
        default: 0.0,
    },
    moneda: {
        type: String,
        default: "No especificado",
    },
    //Para admin
    status: {
        type: String,
        default: "Pendiente",
        enum: ["Pendiente","Procesando","Enviado","Entregado"],
    },
    entregadoAt: {
        type: Date,
    },
},
{
    timestamps: true,
}
);

//Compilar para formar el modelo
const Pedido = mongoose.model("Pedido", pedidoschema);

export default Pedido;