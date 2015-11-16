define(['app/models/player'], function (Player) {
  'use strict';

  function Game(xSize, ySize) {

    if (!(this instanceof Game)) {
      throw new TypeError('Game constructor cannot be called as a function.');
    }

    this.players = [];
    this.grid = [];
    
    for(var i=0; i<25; i++) {
      this.grid[i] = [];
      for(var j=0; j<25; j++) {
          this.grid[i][j] = 0;
    }
}
  }

  Game.prototype = {

    constructor: Game,

    addPlayer: function (nickname) {

      var xPosition = 0,
          yPosition = 0;
      
      while(this.isSomeoneAt(xPosition, yPosition)){
        xPosition = Math.floor(Math.random()*25);
        yPosition = Math.floor(Math.random()*25);
      }
      
      var player = new Player(nickname, xPosition, yPosition);

      this.grid[xPosition][yPosition] = this.players.push(player);
      
      return this.players.indexOf(player);
    },

    isSomeoneAt: function (xPosition, yPosition) {
      return this.grid[xPosition][yPosition] > 0;
    },

    removePlayer: function (player) {
      this.grid[player.getXPosition()][player.getYPosition()] = 0;
      this.players.splice(this.players.indexOf(player), 1);
    },

    getPlayers: function () {
      return this.players;
    },

    getPlayerById: function (playerId) {
      return this.players[playerId];
    },

    setPlayerPosition: function (currentPlayerId, direction) {
      var currentPlayer = this.getPlayerById(currentPlayerId);
      
      this.grid[currentPlayer.getXPosition()][currentPlayer.getYPosition()] = 0;
      
      switch(direction){
        case 'left':
          if(! this.isSomeoneAt((currentPlayer.getXPosition()-1).mod(25), currentPlayer.getYPosition().mod(25)) ){
            currentPlayer.setXPosition((currentPlayer.getXPosition()-1).mod(25));
          }
          break;
        case 'right':
          if(! this.isSomeoneAt((currentPlayer.getXPosition()+1).mod(25), currentPlayer.getYPosition().mod(25)) ){
            currentPlayer.setXPosition((currentPlayer.getXPosition()+1).mod(25));
          }
          break;
        case 'up':
          if(! this.isSomeoneAt(currentPlayer.getXPosition().mod(25), (currentPlayer.getYPosition()-1).mod(25)) ){
            currentPlayer.setYPosition((currentPlayer.getYPosition()-1).mod(25));
          }
          break;
        case 'down':
          if(! this.isSomeoneAt(currentPlayer.getXPosition().mod(25), (currentPlayer.getYPosition()+1).mod(25)) ){
            currentPlayer.setYPosition((currentPlayer.getYPosition()+1).mod(25));
          }
          break; 
          
      }
      
      this.grid[currentPlayer.getXPosition()][currentPlayer.getYPosition()] = 1;
    },
    

  };
  
  Number.prototype.mod = function(n) { return ((this%n)+n)%n; };
  
  
 return Game;
});
