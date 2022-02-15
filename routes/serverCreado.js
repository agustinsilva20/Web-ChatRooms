var express = require('express');
var router = express.Router();

var pool=require("../bd");

router.post('/', async function(req, res, next) {

/*CREAR UN SERVIDOR*/
    let usuario2=await pool.query("select * from usuarios where mail = '" + req.body.correoCreacion+"'");
    console.log(usuario2[0]);
    if(usuario2[0]){
        if (usuario2[0].servidor==0){
            console.log("peticion de creacion de servidor recibida");
            let existeServidor=await pool.query("select * from proyectos where nombre = '" + req.body.proyectoCreacion+"'");
            if(existeServidor[0]){
                console.log("Ya existe un servidor con ese nombre. Cancelando creacion");
                res.render("serverCreado",{yaExiste:"yaExiste"});

            }
            else{
                /*creando servidor*/
                console.log("Informacion correcta. Intentando crear un servidor..");
                let sentencia= "insert into proyectos (nombre,passw) values('"+ req.body.proyectoCreacion+"','"+req.body.passwordCreacion+"')";
                let resultado= await pool.query(sentencia);
                    console.log("servidor creado exitosamente!")
                    res.render("serverCreado",{ok:"ok"});
                    
                /* Obtener los datos del server creado*/
                let serverCreado=await pool.query("select * from proyectos where nombre = '" + req.body.proyectoCreacion+"'");
                /*asignamos servidor*/
                let sentencia2= "update usuarios " +
			        "set servidor= "+ serverCreado[0].id +
                    " where id = " +req.body.id;
        
                let resultado2= await pool.query(sentencia2);
                /*asigno usuario al servidor*/
                let sentencia3= "insert into usuarios_proyectos (id_usuario,id_server) values("+ req.body.id+","+serverCreado[0].id+")";
                let resultado3= await pool.query(sentencia3);
                /*creo la tabla de chats*/
                let sentencia4= `create table chat_proyecto${serverCreado[0].id}(id int auto_increment,id_usuario int not null,nombre varchar(50) not null,canal varchar(50) not null,fecha varchar(50) not null,mensaje varchar(500) not null,primary key (id))`
                let resultado4= await pool.query(sentencia4);

                
                
            }


            

        
        }
        else{
            console.log("El usuario ya pertence a un proyecto. Cancelando la creacion de servidores");
            res.render("serverCreado",{yaTiene:"yaTiene"});

        }
    }
    else{
        res.render("serverCreado",{error:"error"});
    }
    })

module.exports = router;
