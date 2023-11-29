import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Stripe from "stripe";
import Pedido from "../model/Pedido.js";
import dbconectar from "../config/DBConnectar.js";
import rutausers from "../routes/rutausers.js";
import { globalErrorHandler, notFound } from "../middlewares/globalErrorHandler.js";
import rutaproductos from "../routes/rutaproducts.js";
import rutacategories from "../routes/rutacategories.js";
import rutabrands from "../routes/rutabrands.js";
import rutasubcategories from "../routes/rutasubcategories.js";
import rutacolors from "../routes/rutacolors.js";
import rutareviews from "../routes/rutareviews.js";
import rutapedidos from "../routes/rutapedidos.js";
import rutacupones from "../routes/rutacupones.js";

//Conectar base de datos
dbconectar()
const app = express();


//Stripe webhook
const stripe = new Stripe(process.env.STRIPE_KEY);


// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_076bd57e6a1d10a524e93df28bb35e33b4882d0daf4483fd0007fb06185aa455";

app.post('/webhook', express.raw({type: 'application/json'}), async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    console.log("event");
  } catch (err) {
    console.log("err", err.message);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  if (event.type === "checkout.session.completed") {
    //update el pedido 
    const session = event.data.object
    const { pedidoId } = session.metadata;
    const estadopago = session.payment_status;
    const metododepago = session.payment_method_types[0];
    const montototal = session.amount_total;
    const moneda = session.currency;
   //encontrar el pedido
   const pedido = await Pedido.findByIdAndUpdate(
    JSON.parse(pedidoId),
    {
    preciototal: montototal / 100,
    moneda,
    metododepago,
    estadopago,
   },
   {
    new: true,
   }
   );
   console.log(pedido);
  }else {
    return;
  }
  // Handle the event
  /* switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  } */
  // Return a 200 response to acknowledge receipt of the event
  response.send();
});





//Pasar datos entrantes
app.use(express.json());
//Rutas
app.use("/api/v1/users/", rutausers);
app.use("/api/v1/products/", rutaproductos);
app.use("/api/v1/categories/", rutacategories);
app.use("/api/v1/marca/", rutabrands);
app.use("/api/v1/sub/", rutasubcategories);
app.use("/api/v1/colors/", rutacolors);
app.use("/api/v1/reviews/", rutareviews);
app.use("/api/v1/pedido/", rutapedidos);
app.use("/api/v1/cupons/", rutacupones);
//error software intermedio (middleware)



app.use(notFound);
app.use(globalErrorHandler);

export default app;