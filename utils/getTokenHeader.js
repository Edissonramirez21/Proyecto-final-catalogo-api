export const getTokenHeader = (req) => {
    //Obtener token del header
    const token = req?.headers?.authorization?.split(" ")[1];
    if(token === undefined){
        return "No ha sido encontrado el token en el header";
    }else {
        return token;
    }
};