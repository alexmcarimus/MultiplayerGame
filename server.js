// https://kriss.io/buiding-chat-app-with-react-native-and-socketio-cjzi03e3e005bdes19yy89z7d/const
const port = 8002;
const io = require('socket.io')(port);

io.on('connection', function(client) {
    console.log("A user [" + client.id + "] connected! :D");

    client.on('joinRoom', function(room) {
        client.join(room);
        console.log("Client [" + client.id + "] joined Room [" + room + "]");
    });

    client.on('leaveRoom', function(room) {
        client.leave(room);
        console.log("Client [" + client.id + "] left Room [" + room + "]");
    });

    client.on('exchange', function(data, room) {
        client.to(room).emit('exchangeResponse', data);
        console.log("Client [" + client.id + "] is messaging Room [" + room + "] ~ Message: [" + JSON.stringify(data) + "]");
    });

    client.on('checkRoom', function(room, type) {
        let response = 0;
        if (io.sockets.adapter.rooms[room] !== undefined && io.sockets.adapter.rooms[room] !== null) {
            response = io.sockets.adapter.rooms[room].length;
        }
        if (type === 'CREATE') {
            client.emit('checkCreateRoomResponse', response);
            console.log("Client [" + client.id + "] is checking Room to Create - Room [" + room + "] has " + response + " users");
        }
        else if (type === 'JOIN') {
            client.emit('checkJoinRoomResponse', response);
            console.log("Client [" + client.id + "] is checking Room to Join - Room [" + room + "] has " + response + " users");
        }
    });

    client.on('disconnect', function() {
       console.log("A user [" + client.id + "] disconnected! D:");
    });

    client.on('error', function(error) {
        console.log("Error found: " + error);
    });
});

console.log("Socket.io Server started... Listening on port " + port);
