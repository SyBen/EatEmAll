
var express = require("express")
var app = express();
var server = require("http").Server(app);
var port = 8080;
var io = require("socket.io")();
// Program vars
var players = new Array(10);


/******************
Server
******************/

app.use(express.static('public'));

app.get("/", function(req, res){
   res.sendfile('index.html');
});

/******************
Communication
******************/
var io = require("socket.io").listen(server);

io.sockets.on("connection", function (socket) {
  console.log("Socket connected");
});

server.listen(port);
