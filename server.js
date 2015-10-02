// Imports
var server = require("http").createServer(handler);
var socketio = require("socket.io");
var fs = require("fs");
// Program vars

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
