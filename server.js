const net = require('net');

const clientArr = [];
const server = net.createServer(function (socket) {
  clientArr.push(socket);
  socket.write('Welcome, new client!');
  console.log(socket.remoteAddress + ':' + socket.remotePort + ' CONNECTED');

  socket.on('close', () => {
    console.log(socket.remoteAddress + ':' + socket.remotePort + ' DISCONNECTED');
  });

  socket.on('data', (data) => {
    console.log(socket.remoteAddress + ' ' + socket.remotePort + ':' + data.toString());
    let index = clientArr.indexOf(socket);
    clientArr.splice(index, 1);
    clientArr.forEach(client => {
      client.write(data);
    })
    clientArr.push(socket);
  })
});


server.on('error', (err) => {
  throw err;
});

server.listen(9001, '0.0.0.0', () => {
  console.log('server bound');
});