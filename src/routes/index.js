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

router.get('/libros', (req,res) =>
{
    db.ref('contacts').once('value', (snapshot) => 
    {
        const data = snapshot.val();
        res.render('libros', {contacts: data});
    });
    
});

router.get('/delete-contact/:id', (req,res) =>
{
    db.ref('contacts/' + req.params.id).remove();
    res.redirect('/libros');
});



router.post('/new-contact', (req,res)=>
{
    const newContact=
    {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
    };
    db.ref('contacts').push(newContact);
    res.redirect('libros');
});

module.exports = router;