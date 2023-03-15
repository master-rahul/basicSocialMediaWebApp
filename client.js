const net = require('net');
const client = net.connect({ port: 57648 }, () => {//use same port of server  
    console.log('connected to server!');
    client.write('world!\r\n');
});
client.on('data', (data) => {
    console.log(data.toString());
    if(data.toString() == "end")client.end();
});
