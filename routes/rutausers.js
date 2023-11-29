import exppress from 'express';  
import { loginusuariocontroller, registrousercontroller, getUserPerfilController, updateDireccionEnvioctrl } from '../controllers/UsersController.js';
import { isLogueado } from '../middlewares/isLogueado.js';

const rutausers = exppress.Router();

rutausers.post("/register", registrousercontroller);
rutausers.post("/login", loginusuariocontroller);
rutausers.get("/profile", isLogueado, getUserPerfilController);
rutausers.put("/update/envio", isLogueado, updateDireccionEnvioctrl);

export default rutausers;