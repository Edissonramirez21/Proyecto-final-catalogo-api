import asyncHandler from "express-async-handler";
import Cupon from "../model/Cupon.js";


// @desc    Crear nuevo cupon
// @route   POST /api/v1/cupons
// @access  Private/Admin
export const createCuponCtrl = asyncHandler(async (req, res) => {
  const { codigo, fechainicio, fechafinal, descuento } = req.body;
  console.log(req.body);
  //comprobar si admin
  //comprobar si el cupón ya existe
  const couponsExists = await Cupon.findOne({
    codigo,
  });
  if (couponsExists) {
    throw new Error("El cupón ya existe");
  }
  //check if discount is a number
  if (isNaN(descuento)) {
    throw new Error("El valor del descuento debe ser un número");
  }
  //crear cupon
  const cupon = await Cupon.create({
    codigo: codigo?.toUpperCase(),
    fechainicio,
    fechafinal,
    descuento,
    usuario: req.userAuthId,
  });
  //enviar la respuesta
  res.status(201).json({
    status: "Exitoso",
    message: "El Cupon ha sido creado satisfactoriamente",
    cupon,
  });
});

// @desc    obtener todas las respuestas 
// @route   GET /api/v1/cupons
// @access  Private/Admin
export const getAllCuponesCtrl = asyncHandler(async (req, res) => {
  const coupons = await Cupon.find();
  res.status(200).json({
    status: "Exitoso",
    message: "Todos los Cupones",
    coupons,
  });
});

// @desc    Obtener un solo cupon
// @route   GET /api/v1/cupons/:id
// @access  Private/Admin
export const getCuponCtrl = asyncHandler(async (req, res) => {
  const coupon = await Cupon.findById(req.params.id);
/*  //comprobar si no se encuentra
  if (coupon === null) {
    throw new Error("Cupon no encontrado");
  }
  //comprobar si esta expirado
  if (coupon.isExpired) {
    throw new Error("Cupon Expirado");
  } */
  res.json({
    status: "exitoso",
    message: "Cupón obtenido",
    coupon,
  });
});

export const updateCuponCtrl = asyncHandler(async (req, res) => {
  const { codigo, fechainicio, fechafinal, descuento } = req.body;
  const cupones = await Cupon.findByIdAndUpdate(
    req.params.id,
    {
      codigo: codigo?.toUpperCase(),
      descuento,
      fechainicio,
      fechafinal,
    },
    {
      new: true,
    }
  );
  res.json({
    status: "Exitoso",
    message: "El Cupón ha sido actualizado satisfactoriamente",
    cupones,
  });
});

export const deleteCuponCtrl = asyncHandler(async (req, res) => {
  const coupon = await Cupon.findByIdAndDelete(req.params.id);
  res.json({
    status: "Exitoso",
    message: "El Cupón ha sido eliminado satisfactoriamente",
    coupon,
  });
});
