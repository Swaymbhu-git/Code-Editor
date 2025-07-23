import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import ACTIONS from './src/Actions.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

const userSocketMap = {};
// Store the code for each room
const codeForRoom = {};

function getAllConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                userName: userSocketMap[socketId],
            };
        }
    );
}

io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    socket.on(ACTIONS.JOIN, ({ roomId, userName }) => {
        userSocketMap[socket.id] = userName;
        socket.join(roomId);

        // Immediately send the stored code for the room to the new user
        socket.emit(ACTIONS.CODE_CHANGE, { code: codeForRoom[roomId] });

        const clients = getAllConnectedClients(roomId);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                userName,
                socketId: socket.id,
            });
        });
    });

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        // Store the latest code on the server
        codeForRoom[roomId] = code;
        // Broadcast the change to other clients in the room
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    // DELETE THIS HANDLER - It is no longer needed
    // socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    //     io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
    // });

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                userName: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));