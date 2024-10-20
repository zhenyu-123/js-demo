const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    // 允许跨域
    origin: "*",
  },
});
// 处理跨域请求

app.use(express.static(__dirname)); // 设置静态文件目录

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("offer", (offer) => {
    console.log("offer received");
    socket.broadcast.emit("offer", offer);// 广播offer
  });

  socket.on("answer", (answer) => {
    console.log("answer received");
    socket.broadcast.emit("answer", answer);// 广播answer
  });

  // ice-candidate事件
  socket.on("ice-candidate", (candidate) => {
    socket.broadcast.emit("ice-candidate", candidate);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
