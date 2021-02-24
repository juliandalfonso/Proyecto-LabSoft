// MODULOS DEL SERVIDOR

// LLamamos a express.js el framework de nodejs para crear el servidor
const express = require('express');

// modulo morgan (middleware)
const morgan = require('morgan');

// modulo handlebars
const exphbs = require('express-handlebars');
const path = require('path');

// ejecutamos express y lo guardamos en la variable app para que sea usado en index.js
const app = express();

// settings

// establecemos el numero del puerto 
app.set('port', process.env.PORT || 4000);

// le decimos a Node donde esta la carpeta views
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', '.hbs');


// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false}));

// routes

app.use(require('./routes/index'));

// static files
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;