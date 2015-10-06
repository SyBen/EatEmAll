// Imports
var fs = require("fs");
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

// Program vars
var port = 8080;

app.use(express.static('public'));

app.get("/", function(req, res){
   res.sendfile('index.html')
});

io.on("connection", function (socket) {
  console.log("Socket connection");
});

server.listen(port);
console.log("Listening on port " + port);