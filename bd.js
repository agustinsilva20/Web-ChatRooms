var mysql= require ("mysql");
var util=require ("util");
var pool=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"password",
	database:"KNG",
	port:3306});
pool.query = util.promisify(pool.query);
module.exports=pool