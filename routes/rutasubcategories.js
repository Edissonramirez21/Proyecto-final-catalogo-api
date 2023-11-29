import exppress from 'express';  
import { CrearSubCTGController, ObtenerTodasSubCTGController, ObtenerOnlySubCTGController, ActualizarSubCTGController, DeleteSubCTGController } from '../controllers/SubCategoriasController.js';
import { isLogueado } from '../middlewares/isLogueado.js';

const rutasubcategories = exppress.Router();

rutasubcategories.post("/", isLogueado, CrearSubCTGController);
rutasubcategories.get("/", ObtenerTodasSubCTGController);
rutasubcategories.get("/:id", ObtenerOnlySubCTGController);
rutasubcategories.put("/:id", ActualizarSubCTGController);
rutasubcategories.delete("/:id", DeleteSubCTGController);

export default rutasubcategories;