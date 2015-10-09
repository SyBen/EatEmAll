// Imports
var fs = require("fs");
var express = require("express")
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")();
// Program vars

app.use("/", express.static(__dirname + '/client'));
app.get("/", handler);

function handler (req, res) {
  console.log("Connection from : " + req.connection.remoteAddress + " with headers : ");
  console.log(req.headers);
}

io.on("connection", function(socket) {
  console.log("Socket connection");
});

server.listen(8080);
