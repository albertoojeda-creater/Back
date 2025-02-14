import crypto from "crypto";
import jwt from "jsonwebtoken";
import 'dotenv/config'
import { mensaje } from "../libs/mensaje.js";
import { isAdmin } from "../db/userDB.js";

export function encriptarPassword(password){
    const salt = crypto.randomBytes(32).toString("hex");
    const hash = crypto.scryptSync(password, salt, 10, 64, "sha512").toString("hex");
    return{
        salt,
        hash
    }
}

export function validarPassword(password, salt, hash){
    const hashEvaluar = crypto.scryptSync(password, salt, 10, 64, "sha512").toString("hex");
    return hashEvaluar==hash; //En caso de que no sean iguales en la DB esat regresa un falls
}


export function userAutorizado(token, req){
    if(!token){
        return mensaje(400, "Usuario no Autorizado");
    }
    jwt.verify (token,process.env.SECRET_TOKEN,(error, usuario)=>{
        if (error) {
            return mensaje(400, "Usuario no Autorizado");
        }
        req.usuario=usuario; 
    });
    return mensaje(200,"Usuario Autorizado");
}

export async function adminAutorizado(req){
    const answer = userAutorizado(req.cookies.token, req);
    if (answer.status!="200"){
        return mensaje(400,"Admin no autorizado");
    }
    if (await isAdmin(req.usuario.id)!=true) {
        return mensaje(400,"Admin no autorizado");
    }
    return mensaje(200,"Admin autorizado");
}
