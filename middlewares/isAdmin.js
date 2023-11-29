import Usero from "../model/User.js";

const isAdmin = async (req, res, next) => {
  //encontrar the login user
  const user = await Usero.findById(req.userAuthId);
  //verificar if admin
  if (user?.isAdmin) {
    next();
  } else {
    next(new Error("Acceso denegado, sólo administradores"));
  }
};

export default isAdmin;
