const express = require('express');
const router = express.Router();
const fs = require('fs');
const morgan = require('morgan')
const config = require('./../../config');
const auth = require('./../middlewares/auth');
const books = [];

const accessLogStream = fs.createWriteStream('./files/access.log', {flags: 'a'})

router.use(morgan('combined', {stream: accessLogStream}));

   router.route('/')
   .get((req, res)=>{
       res.send(books);
   })
   .post(auth, (req, res)=>{
       let book = {
           id: books.length + 1,
           name: req.body.name,
           author: req.body.author,
       };
       books.push(book);
       console.log(book.name)
       res.send(`Nuevo libro ${book.name}`);
   });

router.route('/:id')
    .get((req, res)=>{
        res.send(`Página del Libro ${req.params.id}`);
    })  
    .delete((req, res)=>{
        res.send(`Eliminar libro ${req.params.id}`);
    })  
    .put((req, res)=>{
        res.send(`Actualizar el libro ${req.params.id}`);
    });

 module.exports = router;