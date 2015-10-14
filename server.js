var express = require("express");
var app = express();
var port = 8080;
var io = require("socket.io")();
var server = require("http").createServer(app);
// Program vars
var players = [];


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
  socket.emit("askNick");
  
  socket.on("setNick", function(data) {
    console.log("Player nick : " + data);
    players.push(data);
    io.sockets.emit("updateUsers", players);
  });
});


//Run server
server.listen(port);
console.log("Server runs on port : " + port);
