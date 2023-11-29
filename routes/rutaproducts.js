import exppress from 'express';  
import upload from '../config/fileUpload.js';
import { CrearProductoController, ObtenerProductosController, ObtenerOnlyProductoController, ActualizarProductoController, DeleteProductoController } from '../controllers/ProductsController.js';
import { isLogueado } from '../middlewares/isLogueado.js';
import isAdmin from '../middlewares/isAdmin.js';


const rutaproductos = exppress.Router();


rutaproductos.post("/", isLogueado, isAdmin, upload.array("files"), CrearProductoController);
rutaproductos.get("/",  ObtenerProductosController);
rutaproductos.get("/:id",  ObtenerOnlyProductoController);
rutaproductos.put("/:id", isLogueado, isAdmin, ActualizarProductoController);
rutaproductos.delete("/:id/delete", isLogueado, isAdmin, DeleteProductoController);


export default rutaproductos;