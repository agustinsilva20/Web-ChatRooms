var express = require('express');
var router = express.Router();

var pool=require("../bd");



/* GET home page. */
router.post('/', async function(req, res, next) {
    
    let usuario=await pool.query("select * from usuarios where mail = '" + req.body.correo+"'");
    console.log(usuario[0]);
    if(usuario[0]){
        console.log("Usuario encontrado");
        let servidores=0;
    if (usuario[0].servidor==0){
        servidores=1;
    }


    if (usuario[0].passw == req.body.password){
        let valorServer= usuario[0].servidor;
        console.log(usuario[0].servidor);

  
        if(valorServer==0){
            console.log("El user no pertence a ningun servidor");
            res.render("KNGapp",{user:usuario[0],servers:servidores,usuarios:"void"});

        }
        else{
           


            console.log("El usuario tiene un servidor");
            let servidor= await pool.query("select * from usuarios_proyectos where id_server = '" + usuario[0].servidor+"'");
            let passwServer= await pool.query("select * from proyectos where id = '" + usuario[0].servidor+"'");
            
            console.log(usuario[0]);
            console.log(servidor);

            res.render("KNGapp",{user:usuario[0],servers:servidores,usuarios:servidor,contra:passwServer[0].passw,nameServer:passwServer[0].nombre,canalLink:"changelog"});
            
        }
        
    }
        else{
            res.render("login",{errorPassword:true});
    }
    }else{
        console.log("El usuario no existe");
        res.render("login",{errorCuenta:true});
    }


    


    


    

});


module.exports = router ;






