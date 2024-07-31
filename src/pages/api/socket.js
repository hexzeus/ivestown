import { Server } from 'socket.io';

const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running');
        res.end();
        return;
    }

    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', socket => {
        socket.on('send-message', msg => {
            io.emit('receive-message', msg);
        });
    });

    console.log('Socket is initialized');
    res.end();
};

export default SocketHandler;