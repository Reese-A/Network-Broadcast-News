const net = require('net');
const server = net.createServer(function (socket) {
  socket.write('Welcome, new client!');
  socket.pipe(socket);
  console.log(socket.remoteAddress + ':' + socket.remotePort + ' CONNECTED');
  socket.on('end', () => {
    console.log(socket.remoteAddress + ':' + socket.remotePort + ' DISCONNECTED');
  })
});
server.on('error', (err) => {
  throw err;
});
server.listen(9001, '0.0.0.0', () => {
  console.log('server bound');
});