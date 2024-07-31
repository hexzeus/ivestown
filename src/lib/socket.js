const { Server } = require('socket.io');

const initSocket = (server) => {
    const io = new Server(server, {
        path: '/api/socket_io',
        addTrailingSlash: false,
    });

    io.on('connection', (socket) => {
        console.log('New client connected');
        socket.on('chat message', (msg) => {
            // Broadcast the message to all clients except the sender
            socket.broadcast.emit('chat message', msg);
        });
    });

    return io;
};

module.exports = { initSocket };