import { Server } from 'socket.io';

export const initSocket = (server) => {
    const io = new Server(server, {
        path: '/api/socket_io',
        addTrailingSlash: false,
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('chat message', (msg) => {
            console.log('Message received:', msg);
            io.emit('chat message', msg); // Broadcast to all connected clients
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    return io;
};