const db = require('../../database/models');
const sequelize = db.sequelize;
const{ Op } = require('sequelize')
const {checkID}= require('../../helpers')


const genresApisController = {
    'list': async (req, res) => {

      
        
        try {
            let genres = await db.Genre.findAll();
            let response = { // la respuesta es un objeto, 
                ok : true, // determino el condicional, si el "ok" esta en true
                meta:{

                    status : 200, // conexion exitosa
                    total :genres.length // cantidad total de generos

                },
                data : {

                    genres // array de los generos 

                }
            }
            return res.status(200).json(response)

        } catch (error) {
          
            console.log(error)
            let response = { 
                ok : false, //fallo de consulta
                meta :{
                    status : 500 // status error
                },
                msg : error.message ? error.message : "comuniquese con el administrador de este sitio"
            }
            return res.status(500).json(response)
            
        }
       
    },
    'detail': async (req, res) => {
        
      /* Checking if the id is valid. */
        if(checkID(req.params.id)){
            return res.status(400).json(checkID(req.params.id))
        }
        try {

            let genre = await db.Genre.findByPk(req.params.id);
            let response;
            if(!genre){ // si no existe el genero

                response = {
                    ok: false,
                    meta : {
                        status : 404 // mando 404 
                    },
                    msg: "No se encuentra el género"
                    
                 }
                 return res.status(404).json(response)
            }
            response = {
                ok : true,
                meta : {
                    status : 200
                },
                data : genre
            }
            return res.status(200).json(response)
          
            
        } catch (error) {
            console.log(error)
            let response = {

                ok : false,
                meta : {
                    status : 500
                },
                msg : error.message ? error.message : "comuniquese con el administrador de este sitio"
            }
            return res.status(500).json(response)
        }
       
    },
    byName : async (req,res)=>{

        try {

            let genre = await db.Genre.findOne({
                where: {
                    name:{
                        
                        [Op.substring] : req.params.name // busco lo que incluya req.params.name
                    } 
                }
            })
            let response;
            if (!genre) {
                response= {
                    ok: false,
                    meta : {
                        status : 404
                    },
                    msg : `No hay un genero con el nombre : ${req.params.name}`
                    
                 }
                 return res.status(404).json(response)


            } 
                response= {
                    ok: true,
                    meta : {
                        status : 200
                    },
                    data : genre                    
                 
                
            }
             return res.status(200).json(response)
            
            
        } catch (error) {
            console.log(error)
            let response = {

                ok : false,
                meta : {
                    status : 500
                },
                msg : error.message ? error.message : "comuniquese con el administrador de este sitio"
            }
            return res.status(error.statusCode || 500).json(response)
        }

    }

}

module.exports = genresApisController;