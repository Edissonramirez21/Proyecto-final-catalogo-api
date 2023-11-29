import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productshema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    marca: {
        type: String,
        required: true,
    },
    categoria:{    
            type: String,
            ref: "Categoria",
            required: true,
    },
    subcategoria:{    
        type: String,
        ref: "Subcategoria",
        required: true,
    },
    tallas: {       
            type: [String],
            enum: ["S", "M", "L", "XL", "XXL"],
            required: false,
    },
    tallasZapatos: {       
        type: [String],
        enum: [35, 36, 37, 38, 39, 40, 41, 42, 43],
        required: false,
    },
    colores: {
        type: [String],
        required: false,
    },
    contenido: {
        type: [String],
        required: false,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "User"
    },

    imagenes: [
        {
            type: String,
            required: true,
        },
    ],

    reseñas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],

    precio: {
        type: Number,
        required: true,
    },
    cantidadtotal: {
        type: Number,
        required: true,
    },
    totalvendido: {
        type: Number,
        required: true,
        default: 0,
    },
},
        {
            timestamps: true,
            toJSON: {virtuals: true},
        }
);
//Virtuales
//Cantidad restante
productshema.virtual("cantidadrestante").get(function () {
    const producto = this;
    return producto.cantidadtotal - producto.totalvendido;
}) 
//Total Rating
productshema.virtual("totalreseñas").get(function () {
    const producto = this;
    return producto?.reseñas?.length;
});
//Promedio Rating
productshema.virtual("promediorating").get(function() {
    let ratingtotal = 0;
    const producto = this;
    producto?.reseñas?.forEach((reseña) => {
        ratingtotal += reseña?.rating;
    });
    //Calcular promedio rating
    const promediorating = (ratingtotal / producto?.reseñas?.length).toFixed(
    1
    );
    return promediorating;
});
//Compilar el Schema al modelo
const Producto = mongoose.model('Producto', productshema);

export default Producto;