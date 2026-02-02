import { Server, Socket } from 'socket.io';

export const handleSignalling = (io: Server, socket: Socket) => {
	interface users {
		[key: string]: string;
	}
	const users: users = {};
	console.log('User connected:', socket.id);

	socket.on('offer', (offer, room) => {
		console.log(`Received offer from ${socket.id} in room ${room}`);

		socket.to(room).emit('offer', offer, socket.id);
	});

	socket.on('answer', (answer, room, senderId) => {
		console.log(`Received answer from ${socket.id} in room ${room}`);

		io.to(senderId).emit('answer', answer);
	});

	socket.on('ice-candidate', (candidate, room, senderId) => {
		console.log(`Received ICE candidate from ${socket.id} in room ${room}`);

		io.to(senderId).emit('ice-candidate', candidate);
	});

	socket.on('join-room', (room, username) => {
		socket.join(room);
		users[socket.id] = username;

		socket.to(room).emit('user-connected', username);
		console.log(`Socket ${socket.id} joined room ${room}`);
	});

	socket.on('send-chat-message', (message, room) => {
		const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

		socket.to(room).emit('chat-message', {
			message: message,
			name: users[socket.id],
			time: timestamp
		});
	});

	socket.on('disconnect', () => {
		console.log('User disconnected:', socket.id);
		// Notify others that the user has left

		// TODO: make this work per room for disconnect (don't know how to pass room to it)
		// socket.to(room).emit('user-disconnected', users[socket.id]);
		// Remove the user from the users object
		delete users[socket.id];
	});
};
