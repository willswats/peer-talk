import { Server, Socket } from 'socket.io';

export const handleSignalling = (io: Server, socket: Socket) => {
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

	socket.on('disconnect', () => {
		console.log('User disconnected:', socket.id);
	});
};
