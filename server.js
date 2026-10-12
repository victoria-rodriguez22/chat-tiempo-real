const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const servidor = http.createServer(app);
const io = new Server(servidor);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Un usuario se conectó');

  socket.on('mensaje', (datos) => {
    io.emit('mensaje‑general', datos);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

const puerto = process.env.PORT || 3000;
servidor.listen(puerto, () => {
  console.log('Servidor activo en el puerto ' + puerto);
});
