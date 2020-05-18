const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const config = require('./../../config');
const jwt = require('jsonwebtoken');
const users = [];

router.route('/login')
.post((req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const luser = users.find(user => user.username === username && bcrypt.compareSync(password, user.password));

    if(!!luser){   
        //generar un token aleatorio
        const token = jwt.sign(
            { 
            id: luser.id,
            username: luser.username,
            name: luser.name
             }, config.keytoken);
        res
        .status(200)
        //enviar como respuesta el token 
        .send(`{token: ${token} }`);
    }else{    
        res
        .status(500)
        .send(`Usuario y contraseña no válidos`);
    }    
});


router.route('/')
    .get((req, res)=>{
        //console.log("entra users");
        res.send(users);
    })
    .post((req, res)=>{
        let user = {
            id: users.length + 1,
            username: req.body.username,
            name: req.body.name,
            password: bcrypt.hashSync(req.body.password, config.saltOrRounds)
        };
        users.push(user);
        console.log(user.password)
        res.send(`Nuevo usuario ${user.username}`);
    });

router.route('/:id')
    .get((req, res)=>{
        res.send(`Página del usuario ${req.params.id}`);
    })  
    .delete((req, res)=>{
        res.send(`Eliminar usuario ${req.params.id}`);
    })  
    .put((req, res)=>{
        res.send(`Actualizar el usuario ${req.params.id}`);
    });

 module.exports = router;