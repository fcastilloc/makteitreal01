//Modules
const fs = require('fs');
const jwt = require('jsonwebtoken');
const config = require('./../../config');

const auth = (req, res, next) => {
	let username = req.header("username");
	let token = req.header("token");
	var decode;	
	try{
		decode = jwt.verify(token, config.keytoken);
	}catch(ex){
		decode = false;
	}
	
	if(!!decode){
        let linea = Date.now() + ", " + username + ", " + req.method + " " + req.path + "\r\n";
	    fs.appendFile('./files/audits.log', linea, (err) => {
            if(err){
                console.log(err);
            }
        });
		next();
	} else {
		res
		.status(500)
		.send('Usuario no autorizado');	
	}	
}

module.exports = auth