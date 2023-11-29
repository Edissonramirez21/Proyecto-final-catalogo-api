import asyncHandler from "express-async-handler";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
import Pedido from "../model/Pedido.js";
import Usero from "../model/User.js";
import Producto from "../model/Product.js";
import Cupon from "../model/Cupon.js";

//@desc Crear Pedidos 
//@route POST /api/v1/users/pedidos
//@access Private
//Stripe webhook
const stripe = new Stripe(process.env.STRIPE_KEY);

export const CreaPedidoController = asyncHandler(async (req, res) => {
    //Obtener teh cupon
    const { cupon } = req?.query;
    
      const cuponFound = await Cupon.findOne({
        codigo: cupon?.toUpperCase(),
      });
      if (cuponFound?.isExpired){
      throw new Error("El Cupón ha caducado");
      }
      if (!cuponFound) {
        throw new Error("El Cupón no existe");
    }    
      //obtener descuento
      const descuento = cuponFound?.descuento / 100;

    //Obtener cargautil(personalizar, pedidoitems, enviodireccion, preciototal);
    const { pedidoitems, direccionenvio, preciototal} = req.body;
    //Encontrar el usuario
    const usuarito = await Usero.findById(req.userAuthId);
    //Verificar si el usuario tiene direccion de envio
    if (!usuarito?.hasdireccionenvio) {
      throw new Error("Por favor proporcione la dirección de envio")
    }
    //Verifica si la orden no esta vacia
    if (pedidoitems?.length <= 0) {
        throw new Error("No hay articulos en el pedido")
    }
    //Realizar/Crear pedido - Guardar en la BD
    const pedido = await Pedido.create({
        usuario: usuarito?._id,
        pedidoitems,
        direccionenvio,
        preciototal: cuponFound ? preciototal - preciototal * descuento : preciototal,
    });
    console.log(pedido);

    //update la cantidad del producto
    const productos = await Producto.find({_id: { $in: pedidoitems }});

        pedidoitems?.map(async (pedido) => {
        const productosos = productos?.find((producto) => {
            return producto?._id.toString() === pedido?._id?.toString();
        });
        if (productosos) {
            productosos.totalvendido += pedido.cantidad;
            await productosos.save();
        }
    });    
    //Empujar la orden hacia el usuario
    usuarito.pedidos.push(pedido?._id);
    await usuarito.save();



  //convertir los artículos del pedido para que tengan la misma estructura que necesita stripe
  const convertedpedidos = pedidoitems.map((item) => {
    return {
        price_data: {
        currency: "usd",
        product_data: {
          name: item?.nombre,
          description: item?.descripcion,
        },
        unit_amount: item?.precio * 100,
      },
      quantity: item?.cantidad,
    };
  });
    //Crear pago (stripe)
    const session = await stripe.checkout.sessions.create({
      line_items: convertedpedidos,
      metadata: {
           pedidoId: JSON.stringify( pedido?._id),
      },
      mode: "payment",
      payment_method_types: ['card'],
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel"
    });
    res.send({ url: session.url });
    
});


//@desc obtener todos los pedidos
//@route GET /api/v1/pedido
//@access private
export const ObtTodospedidosCtrl = asyncHandler(async (req, res) => {
  //encontrar los pedidos
  const pedidos = await Pedido.find().populate("usuario");
  res.json({
    success: true,
    message: "Todos los pedidos",
    pedidos,
  });
});

//@desc obtener una solo pedido
//@route GET /api/v1/pedido/:id
//@access private/admin
 export const getSinglePedidoCtrl = asyncHandler(async (req, res) => {
  //obtener id a partir de los parametros
  const id = req.params.id;
  const pedido = await Pedido.findById(id);
  //send response
  res.status(200).json({
    success: true,
    message: "Un solo pedido",
    pedido,
  });
}); 

//@desc update envio al ser entregado
//@route PUT /api/v1/pedido/update/:id
//@access private/admin
export const updatePedidoCtrl = asyncHandler(async (req, res) => {
  //obtener id de los parametros
  const id = req.params.id;
  //actualizar 
  const actualizarpedido = await Pedido.findByIdAndUpdate(
    id,
    {
      status: req.body.status,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    success: true,
    message: "Pedido Actualizado",
    actualizarpedido,
  });
}); 


//@desc obtener suma de ventas de pedidos
//@route GET /api/v1/pedido/sales/sum
//@access private/admin
export const getPedidoStatusCtrl = asyncHandler(async (req, res) => {
  //obtener pedido status
  const ordenes = await Pedido.aggregate([
    {
      $group: {
        _id: null,
        ventaminima: {
          $min: "$preciototal",
        },
        ventastotales: {
          $sum: "$preciototal",
        },
        ventamaxima: {
          $max: "$preciototal",
        },
        ventapromedio: {
          $avg: "$preciototal",
        },
      },
    },
  ]);
  //obtener la fecha
  const date = new Date();
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const ventadehoy = await Pedido.aggregate([
    {
      $match: {
        createdAt: {
          $gte: today,
        },
      },
    },
    {
      $group: {
        _id: null,
        ventastotales: {
          $sum: "$preciototal",
        },
      },
    },
  ]);
  //enviar la respuesta
  res.status(200).json({
    success: true,
    message: "Suma de Pedidos",
    ordenes,
    ventadehoy,
  });
});


