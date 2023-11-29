import mongoose from "mongoose";

const dbconectar = async ()=>{
    try {
        //mongoose.set("strictQuery", false);
        const conectado = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDb esta conectado ${conectado.connection.host}`);
    }catch (error){
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default dbconectar;