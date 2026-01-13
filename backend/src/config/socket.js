let io;

module.exports = {
  init: (server) => {
    io = require("socket.io")(server, {
      cors: {
        origin: "http://localhost:5173",
        credentials: true
      }
    });

    io.on("connection", (socket) => {
      console.log("🔌 Socket connected:", socket.id);

      socket.on("join", (userId) => {
        socket.join(userId); // user-specific room
      });

      socket.on("disconnect", () => {
        console.log("❌ Socket disconnected:", socket.id);
      });
    });
  },

  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized");
    }
    return io;
  }
};
