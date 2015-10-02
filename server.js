// Imports
var fs = require("fs");
var express = require("express")();
var server = require("http").Server(express);
var socketio = require("socket.io")();
// Program vars


express.get("/", handler);

function handler (req, res) {
  fs.readFile(__dirname + '/site/index.html',
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

server.listen(8080);
