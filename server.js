var express = require("express");
var app = express();
var port = 8080;
var server = require("http").createServer(app);

/******************
Server
******************/

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendfile('index.html');
});

/******************
Communication
******************/
var io = require("socket.io").listen(server);

io.on("connection", function (socket) {
  console.log("Socket connected");
});




//Run server
server.listen(port);
console.log("Server runs on port : " + port);