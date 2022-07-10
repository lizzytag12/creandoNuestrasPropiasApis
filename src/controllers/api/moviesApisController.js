const path = require('path');
const db = require('../../database/models');
const {checkID}= require('../../helpers')
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');



//Aqui tienen otra forma de llamar a cada uno de los modelos


const moviesController = {
    'list': async (req, res) => {

        try {
            let movies =  await db.Movie.findAll({ //obtengo todas las peliculas

                include: ['genre'] // incluyo la relacion con modelo generos

            });
            
            let response = { // la respuesta es un objeto, 
                ok : true, // determino el condicional, si el "ok" esta en true
                meta:{

                    status : 200, // conexion exitosa
                    total : movies.length // cantidad total de peliculas

                },
                data : {

                    movies // array de los peliculas

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

        if(checkID(req.params.id)){
            return res.status(400).json(checkID(req.params.id))
        }
        try {
            let movie = await db.Movie.findByPk(req.params.id,{ // obtengo la pelicula con dicho ID
                include : ['genre'] // incluyo el genero asociado
            });
           
            if(!movie){ // si no existe el pelicula

                response = {
                    ok: false,
                    meta : {
                        status : 404 // mando 404 
                    },
                    msg: "No se encuentra la pelicula con ese ID, intente nuevamente"
                    
                 }
                 return res.status(404).json(response)
            }
            response = {
                ok : true,
                meta : {
                    status : 200
                },
                data : movie
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

       
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            include: ['genre'],
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    },
    create: function (req,res) {
        Movies
        .create(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            }
        )
        .then(()=> {
            return res.redirect('/movies')})            
        .catch(error => res.send(error))
    },
    update: function (req,res) {
        let movieId = req.params.id;
        Movies
        .update(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            },
            {
                where: {id: movieId}
            })
        .then(()=> {
            return res.redirect('/movies')})            
        .catch(error => res.send(error))
    },
    destroy: function (req,res) {
        let movieId = req.params.id;
        Movies
        .destroy({where: {id: movieId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(()=>{
            return res.redirect('/movies')})
        .catch(error => res.send(error)) 
    }
}

module.exports = moviesController;