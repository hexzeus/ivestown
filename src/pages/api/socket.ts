import { NextApiRequest, NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';
import { Server as NetServer } from 'net';
import { ServerResponse } from 'http';

type NextApiResponseWithSocket = NextApiResponse & {
    socket: ServerResponse & {
        server: NetServer & {
            io: SocketIOServer;
        };
    };
};

export default function SocketHandler(req: NextApiRequest, res: NextApiResponseWithSocket) {
    if ((res.socket as any).server.io) {
        console.log('Socket is already running');
        res.end();
        return;
    }

    console.log('Socket is initializing');

    const io = new SocketIOServer((res.socket as any).server, {
        path: '/api/socket',
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    (res.socket as any).server.io = io;

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

    console.log('Socket is initialized');
    res.end();
}
