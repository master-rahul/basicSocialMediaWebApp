const net = require('net');
var server = net.createServer((socket) => {
    socket.end('Closing Socket\n');
}).on('error', (err) => { throw err;});
server.listen(() => {
    address = server.address();
    console.log('opened server on %j', address);
});  