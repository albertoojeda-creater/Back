import mongoose from "mongoose";
import { mensaje } from "../libs/mensaje.js";

export async function conectarDB() {
    try {
        const conexion = await mongoose.connect("mongodb+srv://beto21:Patines13@cluster0.f1nxi.mongodb.net/?retryWrites=true&w=majority&appName=MongoDBApp/MongoDBApp");
        //const conexion = await mongoose.connect("mongodb://localhost:27017/MongoDBApp");
        //console.log("Conexion correcta a mongoDB");
        return mensaje(200,"Conexion Ok");
    } catch (error) {
        return mensaje(400,"Error al conectar DB",error);
    }
}