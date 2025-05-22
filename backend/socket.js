const { Server } = require("socket.io");

let io;

async function initializeSocketIO(httpServer) {
    const io = new Server(httpServer, { 
        cors: {
            origin: process.env.FRONTEND_URL,
            methods: ["GET", "POST"],
            credentials: true
        }
     });

    io.on("connection", (socket) => {
        console.log('user connected:', socket.id)

        socket.on('disconnect', () => {
            console.log('user disconnected:', socket.id);
        })
    });   
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}

module.exports = {
    initializeSocketIO,
    getIO
}