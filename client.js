const net = require('net');

const connection = net.createConnection({
  port: 9001
}, () => {
  console.log('Connected');
});

process.stdin.pipe(connection);

connection.on('data', function (data) {
  console.log(`${data.toString().trim()}`);
});

connection.on('end', function () {
  console.log('Connection closed');
});