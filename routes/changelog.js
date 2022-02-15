var express = require('express');
var router = express.Router();

var pool=require("../bd");



/* GET home page. */
router.post('/:id', async function(req, res, next) {

    console.log(req.body.id);

    let usuario=await pool.query("select * from usuarios where id = '" + req.params.id+"'");

    /*AGREGAR MSJ*/
    if (req.body.msj) { 
        var d = new Date();
        var fecha= (d.getDate() +"/"+d.getMonth()+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes());
       let sentencia= "insert into chat_proyecto"+(usuario[0].servidor)+" (id_usuario,nombre,canal,fecha,mensaje) values("+ req.params.id +",'"+usuario[0].nombre+" "+usuario[0].apellido +"','"+"changelog'"+",'"+fecha +"','"+req.body.msj+"')";
        console.log(sentencia);
        let resultado= await pool.query(sentencia);
        console.log("holaaaAAaAAa");};


    let servidores=0;
    if(usuario[0]){
    if (usuario[0].servidor==0){
        servidores=1;
    }}

    /* OBTENER INFO DEL CHAT*/
    let chat = await pool.query("select * from chat_proyecto" +usuario[0].servidor+ " where canal = 'changelog'");
    console.log(chat);



    let servidor= await pool.query("select * from usuarios_proyectos where id_server = '" + usuario[0].servidor+"'");
    let passwServer= await pool.query("select * from proyectos where id = '" + usuario[0].servidor+"'");

    /*res.render("KNGapp",{user:usuario[0],servers:servidores,chats:chat,usuarios:servidor,contra:passwServer[0].passw,nameServer:passwServer[0].nombre,canal:"CHANGELOG",canalLink:"changelog"});*/


    

    
res.render("KNGapp",{user:usuario[0],servers:servidores,chats:chat,usuarios:servidor,contra:passwServer[0].passw,nameServer:passwServer[0].nombre,canal:"CHANGELOG",canalLink:"changelog"});

})





module.exports = router ;