import crypto from "crypto";

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

export function userAutorizado(){
}

export function adminAutorizado(){

}

/*const {salt,hash} = encriptarPassword("abc");
console.log("salt --->"+salt);
console.log("hash --->"+hash);
const aprobado=validarPassword("abc",salt,hash);
console.log("Aprobado "+aprobado);*/