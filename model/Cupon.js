//coupon model
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cuponSchema = new Schema(
  {
    codigo: {
      type: String,
      required: true,
    },
    fechainicio: {
      type: Date,
      required: true,
    },
    fechafinal: {
      type: Date,
      required: true,
    },
    descuento: {
      type: Number,
      required: true,
      default: 0,
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);


//coupon is expired
cuponSchema.virtual("isExpired").get(function () {
  return this.fechafinal < Date.now();
});

cuponSchema.virtual("diasrestantes").get(function () {
  const diasrestantes =
    Math.ceil((this.fechafinal - Date.now()) / (1000 * 60 * 60 * 24)) +
    " " +
    "dias restantes";
  return diasrestantes;
});

//validation
cuponSchema.pre("validate", function (next) {
  if (this.fechafinal < this.fechainicio) {
    next(new Error("La fecha final no puede ser inferior a la fecha de inicio"));
  }
  next();
});

cuponSchema.pre("validate", function (next) {
  if (this.fechainicio < Date.now()) {
    next(new Error("La fecha de inicio no puede ser inferior a la de hoy"));
  }
  next();
});

cuponSchema.pre("validate", function (next) {
  if (this.fechafinal < Date.now()) {
    next(new Error("La fecha final no puede ser inferior a hoy"));
  }
  next();
});

cuponSchema.pre("validate", function (next) {
  if (this.descuento <= 0 || this.descuento > 100) {
    next(new Error("El descuento no puede ser inferior a 0 ni superior a 100"));
  }
  next();
});




const Cupon = mongoose.model("Cupon", cuponSchema);

export default Cupon;
