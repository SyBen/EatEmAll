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

  //Run server
  server.listen(port);
  console.log("Server runs on port : " + port);


  /******************
  Communication
  ******************/
  var io = socketio.listen(server);
  var game = new Game();
  var player;

  io.on("connection", function (socket) {
    var addedPlayer = false;
    console.log("Un utilisateur s'est connecté");
    io.sockets.emit("updateGame", game);

    socket.on("joinGame", function (data) {

      player = new Player(data);

      game.addPlayer(player);

      io.sockets.emit("updateGame", game);

    });

    socket.on('disconnect', function () {
      if (player instanceof Player) {
        console.log("Le joueur " + player.getNickname() + " s'est déconnecté.");
        game.removePlayer(player);
        io.sockets.emit("updateGame", game);
      } else {
        console.log("un utilisateur s'est déconnecté");
      }
    });


  });




});