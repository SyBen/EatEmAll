// Imports
var http = require("http");
// Program vars


var server = http.createServer(function(req, res) {
  res.writeHead("200");
  res.end("Hello there");
  console.log("Connection from : " + req.connection.remoteAddress + " with headers : ");
  console.log(req.headers);
});

server.listen(8080);
