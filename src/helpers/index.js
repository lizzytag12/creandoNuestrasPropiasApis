
const checkID = (id) => {
   
    if(isNaN(id)){ // si no obtengo un numero por id 

        response = {
            ok: false,
            meta : {
                status : 400 // mando 400 , ERROR DE USUARIO
            },
            msg : "el ID debe ser un número "
            
         }
         return response 
    }
    return false
}

module.exports = {
    checkID
}
