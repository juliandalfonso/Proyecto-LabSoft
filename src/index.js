// Solicitamos el modulo express creado en app.js
const app = require('./app');



const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

server.listen(app.get('port'), () => {
    console.log('listening on *:3000');
  });
