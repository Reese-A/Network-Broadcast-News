const net = require('net');
const clientArr = [];
const server = net.createServer(function (socket) {
  clientArr.push(socket);
  socket.write('Welcome, new client!');
  console.log(socket.remoteAddress + ':' + socket.remotePort + ' CONNECTED');
  socket.on('end', () => {
    console.log(socket.remoteAddress + ':' + socket.remotePort + ' DISCONNECTED');
  });

});
server.on('data', function (data) {
  console.log(`${data}`);
  clientArr.forEach(client => {
    client.write(data);
  });
});

server.on('error', (err) => {
  throw err;
});

server.listen(9001, '0.0.0.0', () => {
  console.log('server bound');
});