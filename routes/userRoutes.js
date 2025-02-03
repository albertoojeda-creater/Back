import { Router } from "express";
import { register, login, getAllUsers, searchById, deleteUser, updateUser } from "../db/userDB.js";
const router = Router();

router.post("/registro", async (req,res)=>{
    const answer = await register(req.body);
    //console.log(answer.mensajeOriginal);
    res.cookie("token",answer.token).status(answer.status).json(answer.mensajeUser);
});

router.post("/login", async (req,res)=>{
    const answer = await login(req.body);
    //console.log(answer.mensajeOriginal);
    res.cookie("token",answer.token).status(answer.status).json(answer.mensajeUser);
});

router.get("/salir", async(req,res)=>{
    res.json("Estas en salir");
});

/*router.get("/usuariosLogueados", async(req,res)=>{
    res.json("Usuarios convencionales y administradores logeados");
});

router.get("/administradores", async(req,res)=>{
    res.json("Administradores logueados");
});

router.get("/cualquierUsuario", async(req,res)=>{
    res.json("Todos los usuarios");
}); */

router.get("/usuarios", async (req, res) => {
    try {
        const answer = await getAllUsers();
        res.status(answer.status).json(answer.mensajeUser);
    } catch (error) {
        res.status(400).json({
            status: 400,
            mensaje: "Error al obtener usuarios",
            error: error.message
        });
    }
});

router.get("/usuario/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const answer = await searchById(id);
        res.status(answer.status).json(answer.mensajeUser);
    } catch (error) {
        res.status(400).json({
            status: 400,
            mensaje: "Error al buscar usuario",
            error: error.message
        });
    }
});

router.delete("/delete/:id", async (req, res) => {
    const answer = await deleteUser({ id: req.params.id });
    res.status(answer.status).json(answer.mensajeUser);
});

router.put("/update/:id", async (req, res) => {
    const answer = await updateUser({ id: req.params.id, updateData: req.body });
    res.status(answer.status).json(answer.mensajeUser);
});


export default router;