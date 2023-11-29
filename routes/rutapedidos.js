import exppress from "express"; 
import { isLogueado } from "../middlewares/isLogueado.js";
import { CreaPedidoController, ObtTodospedidosCtrl, getSinglePedidoCtrl, updatePedidoCtrl, getPedidoStatusCtrl } from "../controllers/PedidosController.js";

const rutapedidos = exppress.Router();

rutapedidos.post("/", isLogueado, CreaPedidoController);
rutapedidos.get("/", isLogueado, ObtTodospedidosCtrl);
rutapedidos.get("/ventas/status", isLogueado, getPedidoStatusCtrl);
rutapedidos.get("/:id", isLogueado, getSinglePedidoCtrl);
rutapedidos.put("/update/:id", isLogueado, updatePedidoCtrl);


export default rutapedidos;