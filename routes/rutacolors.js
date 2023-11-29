import exppress from 'express';  
import { CrearNewColorController, ObtenerAllColorsController, ObtenerOnlyColorController, ActualizarColorController, DeleteColorController } from '../controllers/ColorsController.js';
import { isLogueado } from '../middlewares/isLogueado.js';
import isAdmin from '../middlewares/isAdmin.js';

const rutacolors = exppress.Router();

rutacolors.post("/", isLogueado, isAdmin, CrearNewColorController);
rutacolors.get("/", ObtenerAllColorsController);
rutacolors.get("/:id", ObtenerOnlyColorController);
rutacolors.put("/:id", isLogueado, isAdmin, ActualizarColorController);
rutacolors.delete("/:id", isLogueado, isAdmin, DeleteColorController);

export default rutacolors;