// Imports
var fs = require("fs");
var express = require("express")();
var server = require("http").Server(express);
var io = require("socket.io")();
// Program vars


express.get("/", handler);

function handler (req, res) {
  fs.readFile(__dirname + '/client/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
});
  console.log("Connection from : " + req.connection.remoteAddress + " with headers : ");
  console.log(req.headers);
}

io.on("connection", function(socket) {
  console.log("Socket connection");
});

server.listen(8080);
