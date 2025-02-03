import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import {conectarDB} from "./db/db.js";

async function conexionDB(){
    var mensajeDB = await conectarDB();
    console.log(mensajeDB);
}

const app = express();
conexionDB();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api", userRoutes);

const PORT = process.env.PORT||3000;
app.listen(PORT, ()=>{
    console.log(`Servidor en http://localhost:${PORT}`);
});