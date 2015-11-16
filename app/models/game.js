define(['app/models/player'], function (Player) {
  'use strict';

  function Game(xSize, ySize) {

    if (!(this instanceof Game)) {
      throw new TypeError('Game constructor cannot be called as a function.');
    }

    this.players = [];
    this.grid = [xSize][ySize];
  }

  Game.prototype = {

    constructor: Game,

    addPlayer: function (nickname) {

      var xPosition = 0,
          yPosition = 0;
      
      while(this.isSomeoneAt(xPosition, yPosition)){
        xPosition = Math.floor(Math.random()*50);
        yPosition = Math.floor(Math.random()*50);
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
          if(!(this.isSomeoneAt((currentPlayer.getXPosition()-1), currentPlayer.getYPosition()))){
            currentPlayer.setXPosition(currentPlayer.getXPosition()-1);
          }
          break;
        case 'right':
          if(!(this.isSomeoneAt((currentPlayer.getXPosition()+1), currentPlayer.getYPosition()))){
            currentPlayer.setXPosition(currentPlayer.getXPosition()+1);
          }
          break;
        case 'up':
          if(!(this.isSomeoneAt((currentPlayer.getXPosition()), currentPlayer.getYPosition()-1))){
            currentPlayer.setYPosition(currentPlayer.getYPosition()-1);
          }
          break;
        case 'down':
          if(!(this.isSomeoneAt((currentPlayer.getXPosition()), currentPlayer.getYPosition()+1))){
            currentPlayer.setYPosition(currentPlayer.getYPosition()+1);
          }
          break; 
          
      }
      
      this.grid[currentPlayer.getXPosition()][currentPlayer.getYPosition()] = 1;
    },
    

  };
 return Game;
});
