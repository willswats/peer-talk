// TODO: add dotenv so that environment variables work for the server
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { handler } from '../build/handler.js';
import { handleSignalling } from './handleSignalling.js';

const port = 3000;
const app = express();
const server = createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
	handleSignalling(io, socket);
});

// SvelteKit should handle everything else using Express middleware
// https://github.com/sveltejs/kit/tree/master/packages/adapter-node#custom-server
app.use(handler);

server.listen(port);
