import { getTokenHeader } from "../utils/getTokenHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const isLogueado = (req, res, next) => {
    //Obtener token del header
    const token = getTokenHeader(req);
    //verificar el token
    const Userdecodificado = verifyToken(token);
    if(!Userdecodificado){
        throw new Error("Invalido/Expirado token, por favor inicie nuevamente");
    }else{
        //guardar el usuario dentro req obj
        req.userAuthId = Userdecodificado?.id;
        next();
    }
        
};