import exppress from "express";
import { CrearReviewController } from "../controllers/ReviewsController.js";
import { isLogueado } from "../middlewares/isLogueado.js";

const rutareviews = exppress.Router();

rutareviews.post("/:productoID", isLogueado, CrearReviewController);

export default rutareviews;