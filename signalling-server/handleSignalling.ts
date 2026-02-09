import { Server, Socket } from 'socket.io';

export const handleSignalling = (io: Server, socket: Socket) => {
	interface users {
		[key: string]: string;
	}
	const users: users = {};
	console.log('User connected:', socket.id);

	socket.on('join-room', (roomId, username) => {
		socket.join(roomId);
		users[socket.id] = username;

		socket.to(roomId).emit('user-connected', socket.id);
		console.log(`User ${socket.id} joined room ${roomId}`);

		// ICE candidates, offers, answers
		socket.on('signal', (data) => {
			console.log(`Signal from ${socket.id} to ${data.target}`);
			io.to(data.target).emit('signal', {
				signal: data.signal,
				from: socket.id
			});
		});

		socket.on('send-chat-message', (message) => {
			const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

			socket.to(roomId).emit('chat-message', {
				message: message,
				name: users[socket.id],
				time: timestamp
			});
		});

		socket.on('disconnect', () => {
			console.log(`User ${socket.id} disconnected`);

			delete users[socket.id];
			socket.to(roomId).emit('user-disconnected', socket.id);
		});
	});
};
