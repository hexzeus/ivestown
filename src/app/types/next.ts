import { Server as NetServer, Socket } from 'net'
import { Server as SocketIOServer } from 'socket.io'

export type NextApiResponseServerIO = {
    socket: Socket & {
        server: NetServer & {
            io: SocketIOServer
        }
    }
}