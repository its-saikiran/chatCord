const io = require('socket.io')(7000, {
    cors: {
        origin: '*'
    }
});

const USERS = {};

io.on('connection', socket => {
    socket.on('newUserJoined', userName => {
        USERS[socket.id] = userName;
        socket.broadcast.emit('userJoined', userName)
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { userName: USERS[socket.id], message })
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', USERS[socket.id])
        delete USERS[socket.id];
    })
});

