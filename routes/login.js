var express = require('express');
var router = express.Router();

var pool=require("../bd");



/* GET home page. */
router.get('/', async function(req, res, next) {
    res.render('login');
});




router.post('/',async function (req,res,next){
    let body=req.body;
    /*res.redirect('/KNGapp/'+req.body.correo);*/
    /*res.render('KNGapp');*/
        res.render("KNGapp");


    
    
	;
});


module.exports = router;