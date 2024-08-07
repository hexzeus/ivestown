import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

// Add a basic route for health checks
app.get('/', (req, res) => {
    res.send('Server is running');
});

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL
            ? [process.env.FRONTEND_URL, 'http://localhost:3000']  // Allow both production and development URLs
            : '*',  // Allow all origins if FRONTEND_URL is not set (be cautious with this in production)
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