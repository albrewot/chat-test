const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = (module.exports.io = require("socket.io")(http));
const SocketManager = require("./SocketManager");

const PORT = process.env.PORT || 19200;

io.on("connection", SocketManager);

http.listen(PORT, () => {
  console.log("connected on port 19200");
});
