const net = require('net');

const clientArr = [];
const server = net.createServer(function (socket) {
  clientArr.push(socket);
  // socket.write('Welcome, new client!');
  console.log(socket.remoteAddress + ':' + socket.remotePort + ' CONNECTED');

  socket.on('close', () => {
    console.log(socket.remoteAddress + ':' + socket.remotePort + ' DISCONNECTED');
  });

  socket.on('data', (data) => {
    if (socket.user) {
      console.log(`${socket.user.toString().trim()}: ${data.toString().trim()}`);
      let index = clientArr.indexOf(socket);
      clientArr.splice(index, 1);
      clientArr.forEach(client => {
        return client.write(`${socket.user.toString().trim()}: ${data.toString().trim()}`);
      })
      clientArr.push(socket);
    } else {
      socket.user = data.toString().trim();
      console.log(`New user: ${socket.user}`);
      // console.log(clientArr);
    }
  })
});


server.on('error', (err) => {
  throw err;
});

server.listen(9001, '0.0.0.0', () => {
  console.log('server bound');
});