import exppress from 'express';  
import { CrearMarcaController, ObtenerAllMarcasController, ObtenerOnlyMarcaController, ActualizarMarcaController, DeleteMarcaController } from '../controllers/MarcaController.js';
import { isLogueado } from '../middlewares/isLogueado.js';
import isAdmin from '../middlewares/isAdmin.js';

const rutabrands = exppress.Router();

rutabrands.post("/", isLogueado, isAdmin, CrearMarcaController);
rutabrands.get("/", ObtenerAllMarcasController);
rutabrands.get("/:id", ObtenerOnlyMarcaController);
rutabrands.put("/:id", isLogueado, isAdmin, ActualizarMarcaController);
rutabrands.delete("/:id", isLogueado, isAdmin, DeleteMarcaController);

export default rutabrands;