module.exports.chatSockets = function (socketServer) {
    let io = require('socket.io')(socketServer,{
        cors: {
            methods: ["GET", "POST"],
        }
    })
    io.sockets.on('connection', function (socket) {     // recives connection request 
        console.log('new connection recieved', socket.id);
        socket.on('disconnect', function () {
            console.log('Socket Disconnected', socket.id);
        });
        socket.on('join_room', function (data) {
            console.log('Joining Request recieved', data);
            socket.join(data.chat_room);
            io.in(data.chat_room).emit('user_joined', data); // emmit in a specing chat room
        });
        socket.on('send_message', function(data) {
            io.in(data.chat_room).emit('receive_message', data);
        })
    })
}