import Usero from "../model/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { getTokenHeader } from "../utils/getTokenHeader.js";
import { verifyToken } from "../utils/verifyToken.js";
import Pedido from "../model/Pedido.js";


//@desc Registro usuarios
//@route POST /api/v1/users/register
//@access Private/Admin
export const registrousercontroller = asyncHandler(async (req, res) => {
    const { namescompletos, email, contraseña } = req.body;
    //Verificar que el usuario exista
    const usuarioexiste = await Usero.findOne({email});
    if(usuarioexiste){
        //lanzar
        throw new Error ("El usuario ya existe");
    }
    //has contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);
    //crear usuario
    const User = await Usero.create({
        namescompletos,
        email,
        contraseña: hashedPassword,
    });
    res.status(201).json({
        status:"Exitoso",
        message: "Usuario Registrado Correctamente",
        data: User,
    });
});
//@desc Login User
//@route POST /api/v1/users/login
//@access Public
export const loginusuariocontroller = asyncHandler(async (req, res) => {
    const {email, contraseña} = req.body;
    //Encontrar el usuario en la db solo con email
    const userencontrado = await Usero.findOne({
        email,
    });
    if(userencontrado && (await bcrypt.compare(contraseña, userencontrado?.contraseña))){
    res.json({
          status: "Exitoso",
          message: "El usuario ha sido logueado correctamente",
          userencontrado,
          token: generateToken(userencontrado?._id),
        });
    }else {          
      throw new Error("Credenciales de acceso no válidas");
    }
});

//@desc Login User
//@route POST /api/v1/users/login
//@access Private
export const getUserPerfilController = asyncHandler(async (req, res) => {
  //encontrar el usuario
  const usuario = await Usero.findById(req.userAuthId).populate("pedidos");
  res.json({
    status: "Exitoso",
    message: "Perfil de usuario obtenido con éxito",
    usuario,
  });
});

// @desc    Update usuario direccion envio
// @route   PUT /api/v1/users/update/envio
// @access  Private
export const updateDireccionEnvioctrl = asyncHandler(async (req, res) => {
    const {
      nombre,
      apellido,
      direccion,
      ciudad,
      codigopostal,
      providencia,
      pais,
      telefono,
    } = req.body;
    const userito = await Usero.findByIdAndUpdate(
      req.userAuthId,
      {
        direccionenvio: {
            nombre,
            apellido,
            direccion,
            ciudad,
            codigopostal,
            providencia,
            pais,
            telefono,
        },
        hasdireccionenvio: true,
      },
      {
        new: true,
      }
    );
    //enviar respuesta
    res.json({
      status: "success",
      message: "La dirección de envio del usuario ha sido actualizada correctamente",
      userito,
    });
  });
  