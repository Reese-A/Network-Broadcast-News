const net = require('net');
const client = new net.Socket();
client.connect(9001, '0.0.0.0', function(){
  console.log('Connected');
});

client.on('data', function (data) {
  console.log(`${data}`);
});

client.close('close', function(){
  console.log('Connection closed');
});