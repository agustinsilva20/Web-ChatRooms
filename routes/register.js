var express = require('express');
var router = express.Router();

var pool=require("../bd");



/* GET home page. */
router.get('/', async function(req, res, next) {
    res.render('crear');
});




router.post('/',async function (req,res,next){
        console.log("Nuevo peticion de usuario recibida")
        console.log(req.body.correo);
        console.log(req.body.nombre);
        console.log(req.body.apellido);
        console.log(req.body.password);

        if (req.body.correo && req.body.nombre && req.body.apellido && req.body.password){
            let usuario=await pool.query("select * from usuarios where mail = '" + req.body.correo+"'");
            if (usuario[0]){
                console.log("El usuario ya existe. Creacion cancelada");
                res.render("crear",{error:true});

            }
            else{
                console.log("Creando usuario..")
                let sentencia= "insert into usuarios (nombre,apellido,mail,passw,tokenSeguridad,servidor) values('"+ req.body.nombre+"'" +","+"'"+req.body.apellido+"',"+"'"+req.body.correo +"',"+"'"+req.body.password+"','xd',0)";

                let resultado= await pool.query(sentencia);
                console.log("Usuario creado exitosamente!")
                res.render("cuentacreada");
            }
            
            
        }
        else{
            res.render("crear",{error:true});
        }
        

       


   
    
	;
});


module.exports = router;