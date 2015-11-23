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
  
  var pointsLimit = 5;
  var nbPickups = 5;


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
  var game = new Game(pointsLimit, nbPickups);


  io.on('connection', function (socket) {
    var addedPlayer = false;
    var playerId = socket.id;

    console.log(playerId+' - ' + 'Un utilisateur s\'est connecté');
    io.sockets.emit('updateGame', game);

    socket.on('joinGame', function (nickname) {
      console.log(playerId+' - ' + 'L\'utilisateur s\'est joint à la partie avec le pseudo :'+nickname);
      
      addedPlayer = true;
      
      game.addPlayer(playerId, nickname);

      socket.emit('inGame');

      socket.on('goTo', function (direction) {

        game.setPlayerPosition(playerId, direction);
        
        if(game.getPlayerById(playerId).getPoints() == game.pointsLimit) {
          io.sockets.emit('endGame', game);
          setTimeout(function () {
            game.cleanGame();
             game.startGame();
            io.sockets.emit('startGame', game);
          }, 5000);
        }
        io.sockets.emit('updateGame', game);
        
        

      });

      if(Object.keys(game.playersHash).length < 2){
        socket.emit('waitingGame', game);
      }     
      else if(Object.keys(game.playersHash).length === 2){
        game.startGame();
        io.sockets.emit('startGame', game);
      }
      
    });

    socket.on('disconnect', function () {
      if (addedPlayer) {
        console.log(playerId+' - ' + 'Le joueur ' + game.getPlayerById(playerId).getNickname() + ' s\'est déconnecté.');
        game.removePlayer(playerId);
        
        if(Object.keys(game.playersHash).length < 2){
          console.log('endGame');
          game.cleanGame();
          io.sockets.emit('endGame', game);
        }     
        else {
          io.sockets.emit('updateGame', game);
        }
        
      } else {
        console.log(playerId+' - ' + 'Un utilisateur s\'est déconnecté');
      }
    });


  });




});
