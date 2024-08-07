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

const allowedOrigins = [
    'https://iveshubchat.netlify.app',
    'http://localhost:3000',
    'http://localhost:3001'
];

const io = new Server(httpServer, {
    cors: {
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST'],
        credentials: true
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