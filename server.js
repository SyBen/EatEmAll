var requirejs = require('requirejs');

requirejs.config({
  //Pass the top-level main.js/index.js require
  //function to requirejs so that node modules
  //are loaded relative to the top-level JS file.
  nodeRequire: require
});

requirejs(['express', 'http', 'socket.io', 'app/models/game'], function (express, http, socketio, Game) {
  'use strict';

  var app = express();
  var port = 8080;
  var server = http.createServer(app);


  /******************
  Server
  ******************/

  app.use(express.static('public'));

  app.get('/', function (req, res) {
    res.sendfile('index.html');
  });

  //Run server
  server.listen(port);
  console.log('Server runs on port : ' + port);


  /******************
  Communication
  ******************/
  var io = socketio.listen(server);
  var game = new Game();
  
  
  io.on('connection', function (socket) {
    var addedPlayer = false;
    var playerId;
    
    console.log('Un utilisateur s\'est connecté');
    io.sockets.emit('updateGame', game);

    socket.on('joinGame', function (nickname) {
      addedPlayer = true;

      playerId = game.addPlayer(socket.id, nickname);
      
      socket.emit('inGame');
      
      io.sockets.emit('updateGame', game);
      
      socket.on('goTo', function (direction) {
        
        game.setPlayerPosition(playerId, direction);
        io.sockets.emit('updateGame', game);
        
      });
      
    });

    socket.on('disconnect', function () {
      if (addedPlayer) {
        console.log('Le joueur ' + game.getPlayerById(playerId).getNickname() + ' s\'est déconnecté.');
        game.removePlayer(playerId);
        io.sockets.emit('updateGame', game);
      } else {
        console.log('Un utilisateur s\'est déconnecté');
      }
    });


  });




});