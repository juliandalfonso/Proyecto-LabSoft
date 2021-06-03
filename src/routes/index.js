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




router.get('/login-root', (req,res) =>
{
    res.render('login-root');
});

router.post('/login-root', (req,res) =>
{
    db.ref('root').once("value")
      .then(function(snapshot) {
         var name = snapshot.val(); // {first:"Ada",last:"Lovelace"}
        console.log(name);
        for (var i in name) {
            if(name[i].rootemail == req.body.rootemail )
            {
                if(name[i].password == req.body.password)
                {
                    res.redirect('root');
                }
            }
        }
      });
});


router.get('/root', (req,res)=>
{
    db.ref('administradores').once('value', (snapshot) => 
    {
        const data = snapshot.val();
        res.render('root', {administradores: data});
    });
});

router.post('/root', (req,res)=>
{
  
    const newadmin=
    {
        adminemail: req.body.adminemail,
        password: req.body.password
    };
    db.ref('administradores').push(newadmin);
    res.redirect('root');
});









router.get('/nuevo-root', (req,res) =>
{
    res.render('root');
});

router.post('/nuevo-root', (req,res)=>
{
  
    const newroot=
    {
        rootemail: req.body.adminemail,
        password: req.body.password
    };
    db.ref('root').push(newroot);
    res.redirect('root');
});






//ADMIN MIDDLEWARES

router.get('/login-admin', (req,res) =>
{
    res.render('login-admin');
});

router.post('/login-admin', (req,res)=>
{

      db.ref('administradores').once("value")
      .then(function(snapshot) {
         var name = snapshot.val(); // {first:"Ada",last:"Lovelace"}
        console.log(name);
        for (var i in name) {
            if(name[i].adminemail == req.body.adminemail )
            {
                if(name[i].password == req.body.password)
                {
                    db.ref('books').once('value', (snapshot) => 
                    {
                        const data = snapshot.val();
                        res.render('libros-admin', {books: data});
                    });
                }
            }
        }
      });
      

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




//NOTICIAS MIDDLEWARE
router.get('/noticias', (req,res) =>
{
    res.render('noticias');
    
});





//CHAT MIDDLEWARE
router.get('/chat', (req,res) =>
{
    res.render('chat');
    
});


router.get('/buscar', (req,res) =>
{
    db.ref('books').once('value', (snapshot) => 
    {
        const data = snapshot.val();
        res.render('buscar', {books: data});
    });
    
});


module.exports = router;