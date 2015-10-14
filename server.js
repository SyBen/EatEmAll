var requirejs = require('requirejs');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

requirejs(["express", "socket.io", "http", "app/models/player", "app/models/game"], function (express, socketio, http, Player, Game) {
  "use strict";
  
  var app = express();
  var port = 8080;
  var server = http.createServer(app);
  
  
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
var io = socketio.listen(server);
var players = [];

io.on("connection", function (socket) {
  console.log("Socket connected");
  socket.emit("askNick");
  
  socket.on("setNick", function(data) {
    
    var player = new Player(data);
    console.log(player.toString());
    players.push(player);
    io.sockets.emit("updateUsers", players);
    
  });
});


//Run server
server.listen(port);
console.log("Server runs on port : " + port);

  
});

