const net = require('net');

const connection = net.createConnection({
  port: 9001
}, () => {
  console.log('Connected');
});

// process.stdin.pipe(connection);
process.stdin.on('data', function(data){
  connection.write(data.toString().trim());
});

connection.on('data', function (data) {
  console.log(data.toString().trim());
});

connection.on('end', function () {
  console.log('Connection closed');
});