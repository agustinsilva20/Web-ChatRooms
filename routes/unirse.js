var express = require('express');
const { render } = require('../app');
var router = express.Router();

var pool=require("../bd");

router.post('/', async function(req, res, next) {
    let usuario=await pool.query("select * from usuarios where id = " + req.body.id+"");
    let proyecto=await pool.query("select * from proyectos where nombre = '" + req.body.proyectoUnir+"'");
    if (usuario[0].servidor==0){
        if(proyecto[0]){
                if(proyecto[0].passw==req.body.passwordUnir){
                    console.log("Contraseña correcta. Iniciando matcheo.....");
                    /*asignamos servidor*/
                        let sentencia2= "update usuarios " +"set servidor= "+ proyecto[0].id +" where id = " +req.body.id;
                        let resultado2= await pool.query(sentencia2);
                    /*asigno usuario al servidor*/
                    let sentencia3= "insert into usuarios_proyectos (id_usuario,id_server) values("+ req.body.id+","+proyecto[0].id+")";
                    let resultado3= await pool.query(sentencia3);

                    console.log("¡Usuario conectado correctamente!")
                    res.render("unirse",{ok:"ok"});


                }
                else{
                    console.log("Contraseña incorrecta. Cancelando matcheo");
                    res.render("unirse",{errorPasw:"error"});
                }

        }
        else{
            console.log("No existe el servidor");
            res.render("unirse",{existe:"error"});
        }
    }
    else{
        console.log("El usuario ya posee un servidor. Cancenlando matcheo");
        res.render("unirse",{error:"error"});
    }
    







});





module.exports = router;