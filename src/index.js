// Solicitamos el modulo express creado en app.js
const app = require('./app');

// Establecemos el puerto de escucha del servidor
app.listen(app.get('port'));
console.log('server on port ', app.get('port'));