require("dotenv").config();
const http = require("http");

const app = require("./app");
const connectDB = require("./config/db");
const socket = require("./config/socket");

connectDB();

const server = http.createServer(app);

// 🔔 initialize socket
socket.init(server);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
