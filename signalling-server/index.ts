import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { handler } from '../build/handler.js';
import { handleSignalling } from './handleSignalling.ts';

const port = 3000;
const app = express();
const server = createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
	handleSignalling(io, socket);
});

app.use(handler);

server.listen(port);
