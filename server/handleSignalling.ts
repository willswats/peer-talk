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

	socket.on('join-room', (room) => {
		socket.join(room);

		console.log(`Socket ${socket.id} joined room ${room}`);
	});

	socket.on('new-user', (name) => {
		users[socket.id] = name;

		// Notify all other clients that a new user has connected
		socket.broadcast.emit('user-connected', name);
	});

	// When a user sends a chat message
	socket.on('send-chat-message', (message) => {
		// Get the current time as a readable timestamp (e.g. "09:45 AM")
		const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

		// Broadcast the message to all other users along with the sender's name and timestamp
		socket.broadcast.emit('chat-message', {
			message: message,
			name: users[socket.id],
			time: timestamp
		});
	});

	socket.on('disconnect', () => {
		console.log('User disconnected:', socket.id);
		// Notify others that the user has left
		socket.broadcast.emit('user-disconnected', users[socket.id]);

		// Remove the user from the users object
		delete users[socket.id];
	});
};
