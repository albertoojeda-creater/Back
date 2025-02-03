export function mensaje(status, mensajeUser, mensajeOriginal="",token=""){
    return{
        status,
        mensajeUser,
        mensajeOriginal,
        token
    }
}