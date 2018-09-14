var socketio = require('socket.io');
module.exports = function (app, server) {
    var io = socketio.listen(server);

    io.sockets.on("connection", (socket) => {
        console.log("Connected Socket = " + socket.id)
        socket.emit('map', map);

        socket.on("data", (data) => {
            map[data.y][data.x] = data.color
            socket.broadcast.emit('update', data);

        })
        socket.on("cursor", (data) => {
            socket.broadcast.emit('cursor', data);

        })

        socket.on("init", (data, size) => {
            initMap(data, size)
            setTimeout(()=>{
                io.sockets.emit('map', map);
            }, 100)
        socket.on('disconnect', function () {
               socket.broadcast.emit('left', socket.id)
               console.log(socket.id)
        });

        })
    })
};

var map = []

function initMap(color, size) {
    map = []
    for (let i = 0; i < size; i++) {
        map[i] = []
        for (let j = 0; j < size; j++) {
            map[i][j] = color
        }
    }

}

initMap("#FFFFFF", 40)