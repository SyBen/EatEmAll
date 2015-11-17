define(['app/models/player', 'app/models/pickup'], function (Player, Pickup) {
  'use strict';

  function Game(xSize, ySize) {

    if (!(this instanceof Game)) {
      throw new TypeError('Game constructor cannot be called as a function.');
    }

    this.pickups = [];
    this.playersHash = {};
    this.grid = [];
    
    //Initialize grid with nobody
    for(var i=0; i<25; i++) {
      this.grid[i] = [];
      for(var j=0; j<25; j++) {
          this.grid[i][j] = 0;
      }
    }
    
    for(var k =0; k < 5; k++){
      this.addPickup();
    }
  }

  Game.prototype = {

    constructor: Game,
    
    addPickup: function () {
      var xPosition = Math.floor(Math.random()*25),
          yPosition = Math.floor(Math.random()*25);
      
      while(this.isSomethingAt(xPosition, yPosition)){
        xPosition = Math.floor(Math.random()*25);
        yPosition = Math.floor(Math.random()*25);
      }
      
      var pickup = new Pickup(xPosition, yPosition);
      this.pickups.push(pickup);
      this.grid[xPosition][yPosition] = -1;
    },

    addPlayer: function (playerId, nickname) {

      var xPosition = 0,
          yPosition = 0;
      
      while(this.isSomeoneAt(xPosition, yPosition)){
        xPosition = Math.floor(Math.random()*25);
        yPosition = Math.floor(Math.random()*25);
      }
      
      var player = new Player(playerId, nickname, xPosition, yPosition);
      this.playersHash[playerId] = player;
      this.grid[xPosition][yPosition] = 1;
      
    },
    
    isSomeoneAt: function (xPosition, yPosition) {
      return this.grid[xPosition][yPosition] > 0;
    },   
    
    isSomethingAt: function (xPosition, yPosition) {
      return this.grid[xPosition][yPosition] !== 0;
    },

    removePlayer: function (playerId) {
      var currentPlayer = this.getPlayerById(playerId);
      this.grid[currentPlayer.getXPosition()][currentPlayer.getYPosition()] = 0;
      delete this.playersHash[playerId];
    },

    getPlayersHash: function () {
      return this.playersHash;
    },

    getPlayerById: function (playerId) {
      return this.playersHash[playerId];
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
