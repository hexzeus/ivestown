import { Server } from 'socket.io';

const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running');
        res.end();
        return;
    }

    console.log('Socket is initializing');
    const io = new Server(res.socket.server, {
        path: '/api/socket_io',
        addTrailingSlash: false,
    });
    res.socket.server.io = io;

    io.on('connection', socket => {
        console.log('New client connected');
        socket.on('chat message', msg => {
            io.emit('chat message', msg);
        });
    });

    console.log('Socket is initialized');
    res.end();
};

export default SocketHandler;