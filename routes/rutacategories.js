import exppress from 'express';  
import { CrearCategoriaController,ObtenerCategoriasController, ObtenerOnlyCategoriaController, ActualizarCategoriaController, DeleteCategoriaController } from '../controllers/CategoriesController.js';
import { isLogueado } from '../middlewares/isLogueado.js';
import categoriaFileUpload from '../config/categoriaUpload.js';

const rutacategories = exppress.Router();

rutacategories.post("/", isLogueado, categoriaFileUpload.single("file"), CrearCategoriaController);
rutacategories.get("/", ObtenerCategoriasController);
rutacategories.get("/:id", ObtenerOnlyCategoriaController);
rutacategories.put("/:id", ActualizarCategoriaController);
rutacategories.delete("/:id", DeleteCategoriaController);

export default rutacategories;