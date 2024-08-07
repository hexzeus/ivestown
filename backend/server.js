import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
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

const port = process.env.PORT || 3001;
httpServer.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
});