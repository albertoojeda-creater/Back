import User from "../models/userModelo.js";
import { encriptarPassword, validarPassword } from "../middlewares/funtionPassword.js";
import {mensaje} from "../libs/mensaje.js";
import { crearToken } from "../libs/jwt.js";

export const register = async ({username, email, password})=>{
    try {
        const userDuplicate = await User.findOne({username});
        const emailDuplicate = await User.findOne({email});
        if (userDuplicate || emailDuplicate) {
            return mensaje(400,"El usuario ya existe");
        }
        const {salt, hash}=encriptarPassword(password);
        const dataUser = new User({username,email,password:hash,salt});
        const mongoAnswer = await dataUser.save();
        //console.log(mongoAnswer);
        
        const token = await crearToken({id:mongoAnswer._id});
        return mensaje (200,"Usuario registrado","",token);
    } catch (error) {
        return mensaje(400,"Error al registrar Usuario",error);
    }
}

export const login = async ({username,password})=>{
    try {
        const userFound = await User.findOne({username});
        if(!userFound){
            return mensaje(400,"Datos incorrectos");
        }
        const validatePassword = validarPassword(password,userFound.salt,userFound.password);
        if (!validatePassword) {
            return mensaje(400,"Datos incorrectos");
        }
        const token = await crearToken({id:userFound._id});
        return mensaje(200,`Bienvenido ${userFound.username}`,"",token)
    } catch (error) {
        return mensaje(400,"Datos incorrectos",error);
    }
}

export const getAllUsers = async () => {
    try {
        const users = await User.find();
        return {
            status: 200,
            mensajeUser: users // Devuelve todos los usuarios
        };
    } catch (error) {
        return {
            status: 400,
            mensajeUser: "Error al obtener usuarios"
        };
    }
};

export const searchById = async (id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return {
                status: 404,
                mensajeUser: "Usuario no encontrado"
            };
        }
        return {
            status: 200,
            mensajeUser: user
        };
    } catch (error) {
        return {
            status: 400,
            mensajeUser: "Error al buscar usuario"
        };
    }
};

export const deleteUser = async ({ id }) => {
    try {
        const userDeleted = await User.findByIdAndDelete(id);
        if (!userDeleted) {
            return mensaje(404, "Usuario no encontrado");
        }
        return mensaje(200, "Usuario borrado correctamente");
    } catch (error) {
        return mensaje(400, "Error al borrar usuario", error);
    }
};

export const updateUser = async ({ id, updateData }) => {
    try {
        const userUpdated = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!userUpdated) {
            return mensaje(404, "Usuario no encontrado");
        }
        return mensaje(200, "Usuario actualizado correctamente", userUpdated);
    } catch (error) {
        return mensaje(400, "Error al actualizar usuario", error);
    }
};