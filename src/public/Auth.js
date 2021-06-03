

//SIGNUP
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit',(e)=>
{
    e.preventDefault();
    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;


    auth
        .createUserWithEmailAndPassword(email,password)
        .then(userCredential =>
            {
                //borrar formulario
                signupForm.reset();
                $('#signupModal').modal('hide');
                console.log('signup');
        })  

});

//SIGNIN
const signinForm = document.querySelector('#login-form');

signinForm.addEventListener('submit', e => 
{
    e.preventDefault();
    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;
    auth
        .signInWithEmailAndPassword(email,password)
        .then(userCredential =>
            {
                //borrar formulario
                signupForm.reset();
                $('#signinModal').modal('hide');
                console.log('logeado');
        })  
});

const logout = document.querySelector('#logout');

logout.addEventListener('click', e =>
{
    e.preventDefault();
    auth.signOut().then(() =>
    {
        console.log('logout');
    })
});

//Google Login
const googleButton = document.querySelector('#googleLogin');

googleButton.addEventListener('click', e =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result =>
            {
                console.log('google sign in');
                //borrar formulario
                signupForm.reset();
                $('#signupModal').modal('hide');
            })
        .catch(err =>
            {
                console.log(err);
            })
});


// FACEBOOK LOGIN
const facebookButton = document.querySelector('#facebookLogin');

facebookButton.addEventListener('click', e => 
{
    e.preventDefault();
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => 
            {
                console.log('fb signed IN');
                //borrar formulario
                signupForm.reset();
                $('#signupModal').modal('hide');
            })
        .catch(err =>
            {
                console.log(err);
            }) 
})



//evntos
//si el usuario esta autenticado podra ver los datos
auth.onAuthStateChanged(user =>
    {
        if(user)
        {

            console.log('bienvenido');
            loginCheck(user);
        }
        else{
            console.log('chao');
            loginCheck(user);
        }
    });

    loggedOutLinks = document.querySelectorAll('.logged-out');
    loggedInLinks = document.querySelectorAll('.logged-in');
    
    const loginCheck = user =>
    {
        if(user)
        {
            loggedInLinks.forEach(link => link.style.display = 'block');
            loggedOutLinks.forEach(link => link.style.display = 'none');
        }
        else
        {
            loggedInLinks.forEach(link => link.style.display = 'none');
            loggedOutLinks.forEach(link => link.style.display = 'block');
    
        }
    }