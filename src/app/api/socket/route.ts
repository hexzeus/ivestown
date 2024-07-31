import { Server as SocketIOServer } from 'socket.io';
import type { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

let io: SocketIOServer;

export async function GET(req: Request, res: NextApiResponse) {
    if (!io) {
        console.log('Socket is initializing');
        // @ts-ignore
        const httpServer = res.socket?.server;
        io = new SocketIOServer(httpServer, {
            path: '/api/socket_io',
            addTrailingSlash: false,
        });

        io.on('connection', (socket) => {
            console.log('New client connected');
            socket.on('chat message', (msg: any) => {
                io.emit('chat message', msg);
            });
        });
    } else {
        console.log('Socket is already running');
    }

    return NextResponse.json({ message: 'Socket initialized' }, { status: 200 });
}