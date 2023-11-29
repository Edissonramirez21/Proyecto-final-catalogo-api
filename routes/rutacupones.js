import exppress from "express";
import { isLogueado } from "../middlewares/isLogueado.js";
import { createCuponCtrl, getAllCuponesCtrl, getCuponCtrl, updateCuponCtrl, deleteCuponCtrl } from "../controllers/CuponesController.js";
import isAdmin from "../middlewares/isAdmin.js";


const rutacupones = exppress.Router();

rutacupones.post("/", isLogueado, isAdmin, createCuponCtrl);
rutacupones.get("/", getAllCuponesCtrl);
rutacupones.put("/update/:id", isLogueado, isAdmin, updateCuponCtrl);
rutacupones.delete("/delete/:id", isLogueado, isAdmin, deleteCuponCtrl);
rutacupones.get("/:id", getCuponCtrl);


export default rutacupones;
