import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

const app = express();
app.use(cors());
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Health check route
app.get('/', (req, res) => {
    res.send('Server is running');
});

const httpServer = createServer(app);

const allowedOrigins = [
    'https://iveshubchat.netlify.app',
    'http://localhost:3000',
    'http://localhost:3001',
    'https://iveshubchat.com'
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

// Store active users
const activeUsers = new Map();

io.on('connection', (socket) => {
    console.log('New client connected');

    // Handle user joining
    socket.on('join', (username) => {
        const userId = uuidv4();
        activeUsers.set(socket.id, { id: userId, username });
        socket.emit('userId', userId);
        io.emit('userList', Array.from(activeUsers.values()));
        io.emit('systemMessage', { text: `${username} has joined the chat.` });
    });

    socket.on('chat message', (msg) => {
        console.log('Message received:', msg);
        io.emit('chat message', msg);
    });

    socket.on('typing', (isTyping) => {
        const user = activeUsers.get(socket.id);
        if (user) {
            socket.broadcast.emit('userTyping', { userId: user.id, isTyping });
        }
    });

    socket.on('disconnect', () => {
        const user = activeUsers.get(socket.id);
        if (user) {
            activeUsers.delete(socket.id);
            io.emit('userList', Array.from(activeUsers.values()));
            io.emit('systemMessage', { text: `${user.username} has left the chat.` });
        }
        console.log('Client disconnected');
    });
});

const port = process.env.PORT || 3001;
httpServer.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
});