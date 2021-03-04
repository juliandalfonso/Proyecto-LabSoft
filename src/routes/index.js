const {Router} = require('express');

const router = Router();
const admin = require('firebase-admin');

var serviceAccount = require("../../proyecto-labsoft-firebase-adminsdk-5ufm3-65f0bdfca7.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://proyecto-labsoft-default-rtdb.firebaseio.com/'
});

const db = admin.database();

router.get('/', (req,res) =>
{
    res.render('index');
});

router.get('/libros-admin', (req,res) =>
{
    db.ref('books').once('value', (snapshot) => 
    {
        const data = snapshot.val();
        res.render('libros-admin', {books: data});
    });
    
});

router.get('/delete-book/:id', (req,res) =>
{
    db.ref('books/' + req.params.id).remove();
    res.redirect('/libros-admin');
});


router.get('/update-book/:id', (req,res) =>
{
    
    res.redirect('/libros-admin');
});



router.post('/new-book', (req,res)=>
{
  
    const newBook=
    {
        titulo: req.body.titulo,
        imagen: req.body.imagen,
        anopublicacion: req.body.anopublicacion,
        genero: req.body.genero,
        numeropaginas: req.body.numeropaginas,
        editorial: req.body.editorial,
        issn: req.body.issn,
        idioma: req.body.idioma,
        fechapublicacion: req.body.fechapublicacion,
        uso: req.body.uso,
        precio: req.body.precio
    };
    db.ref('books').push(newBook);
    res.redirect('/libros-admin');
});



router.get('/noticias', (req,res) =>
{
    res.render('noticias');
    
});


router.get('/buscar', (req,res) =>
{
    res.render('buscar');
    
});


module.exports = router;