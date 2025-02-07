import { log } from "console";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import 'dotenv/config'

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


export function userAutorizado(req,res,next){
    const token = req.cookies.token;
    if(!token){
        res.status(400).json("Usuario no autorizado");
    }
    jwt.sign (token,process.env.SECRET_TOKEN,(error, usuario)=>{
        if (error) {
            res.status(400).json("Usuario no autorizado");
        }
        req.usuario=usuario; 
    });
    next();
}

export function adminAutorizado(){
    
}

/*const {salt,hash} = encriptarPassword("abc");
console.log("salt --->"+salt);
console.log("hash --->"+hash);
const aprobado=validarPassword("abc",salt,hash);
console.log("Aprobado "+aprobado);*/