//perfect server.js

const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "font-src 'self' http://localhost:4000");
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "sender.html"));
});

io.on("connection", function (socket) {
  socket.on("sender-join", function (data) {
    socket.join(data.uid);
  });

  socket.on("reciever-join", function (data) {
    if (!io.sockets.adapter.rooms.has(data.sender_uid)) {
      socket.emit("invalid-room");
      return;
    }
    socket.join(data.uid);
    socket.in(data.sender_uid).emit("init", data.uid);
  });

  socket.on("file-meta", function (data) {
    socket.in(data.uid).emit("fs-meta", data.metadata);
  });

  socket.on("fs-start", function (data) {
    socket.in(data.uid).emit("fs-share", {});
  });

  socket.on("file-raw", function (data) {
    socket.in(data.uid).emit("fs-share", data.buffer);
  });
});

server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});

