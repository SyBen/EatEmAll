define(['app/models/player', 'app/models/pickup'], function (Player, Pickup) {
  'use strict';

  function Game(pointsLimit, nbPickups) {

    if (!(this instanceof Game)) {
      throw new TypeError('Game constructor cannot be called as a function.');
    }
    

    this.playersHash = {};
    this.pointsLimit = pointsLimit;
    
    this.nbPickups = nbPickups;
    this.pickups = [];
    
    this.grid = [];

    //Initialize grid with nobody
    for (var i = 0; i < 25; i++) {
      this.grid[i] = [];
      for (var j = 0; j < 25; j++) {
        this.grid[i][j] = 0;
      }
    }

  }

  Game.prototype = {

    constructor: Game,

    addPickup: function () {
      var xPosition = Math.floor(Math.random() * 25),
        yPosition = Math.floor(Math.random() * 25);

      while (this.isSomethingAt(xPosition, yPosition)) {
        xPosition = Math.floor(Math.random() * 25);
        yPosition = Math.floor(Math.random() * 25);
      }

      var pickup = new Pickup(xPosition, yPosition);
      this.pickups.push(pickup);
      this.grid[xPosition][yPosition] = -1;
    },

    removePickup: function (xPosition, yPosition) {
      this.pickups = this.pickups.filter(function (pickup) {
        return !(pickup.getX() === xPosition && pickup.getY() === yPosition);
      });
    },
    
    addPlayer: function (playerId, nickname) {

      var xPosition = 0,
        yPosition = 0;
      var color = '#'+Math.floor(Math.random()*16777215).toString(16);
      
      while (this.isSomeoneAt(xPosition, yPosition)) {
        xPosition = Math.floor(Math.random() * 25);
        yPosition = Math.floor(Math.random() * 25);
      }
      
      while(this.existingColor(color)){
        color = '#'+Math.floor(Math.random()*16777215).toString(16);
      }

      var player = new Player(playerId, nickname, xPosition, yPosition, color);
      this.playersHash[playerId] = player;
      this.grid[xPosition][yPosition] = 1;

    },
    
    existingColor: function (color){
      var boolColor = false;
      for(var key in this.playersHash){
        if(this.playersHash[key].color === color){
          boolColor = true;
        }
      }
      
      return boolColor;
    },
    
    removePlayer: function (playerId) {
      var currentPlayer = this.getPlayerById(playerId);
      this.grid[currentPlayer.getXPosition()][currentPlayer.getYPosition()] = 0;
      delete this.playersHash[playerId];
    },

    isSomeoneAt: function (xPosition, yPosition) {
      return this.grid[xPosition][yPosition] > 0;
    },

    isSomethingAt: function (xPosition, yPosition) {
      return this.grid[xPosition][yPosition] !== 0;
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

      switch (direction) {
      case 'left':
        if (!this.isSomeoneAt((currentPlayer.getXPosition() - 1).mod(25), currentPlayer.getYPosition().mod(25))) {
          currentPlayer.setXPosition((currentPlayer.getXPosition() - 1).mod(25));
          if (this.isSomethingAt(currentPlayer.getXPosition().mod(25), currentPlayer.getYPosition().mod(25))) {
            currentPlayer.addPoint();
            this.removePickup(currentPlayer.getXPosition(), currentPlayer.getYPosition());
            this.addPickup();
          }
        }
        break;
      case 'right':
        if (!this.isSomeoneAt((currentPlayer.getXPosition() + 1).mod(25), currentPlayer.getYPosition().mod(25))) {
          currentPlayer.setXPosition((currentPlayer.getXPosition() + 1).mod(25));
          if (this.isSomethingAt(currentPlayer.getXPosition().mod(25), currentPlayer.getYPosition().mod(25))) {
            currentPlayer.addPoint();
            this.removePickup(currentPlayer.getXPosition(), currentPlayer.getYPosition());
            this.addPickup();
          }
        }
        break;
      case 'up':
        if (!this.isSomeoneAt(currentPlayer.getXPosition().mod(25), (currentPlayer.getYPosition() - 1).mod(25))) {
          currentPlayer.setYPosition((currentPlayer.getYPosition() - 1).mod(25));
          if (this.isSomethingAt(currentPlayer.getXPosition().mod(25), currentPlayer.getYPosition().mod(25))) {
            currentPlayer.addPoint();
            this.removePickup(currentPlayer.getXPosition(), currentPlayer.getYPosition());
            this.addPickup();
          }
        }
        break;
      case 'down':
        if (!this.isSomeoneAt(currentPlayer.getXPosition().mod(25), (currentPlayer.getYPosition() + 1).mod(25))) {
          currentPlayer.setYPosition((currentPlayer.getYPosition() + 1).mod(25));
          if (this.isSomethingAt(currentPlayer.getXPosition().mod(25), currentPlayer.getYPosition().mod(25))) {
            currentPlayer.addPoint();
            this.removePickup(currentPlayer.getXPosition(), currentPlayer.getYPosition());
            this.addPickup();
          }
        }
        break;

      }

      this.grid[currentPlayer.getXPosition()][currentPlayer.getYPosition()] = 1;
    },
    
    startGame: function () {
      for (var k = 0; k < this.nbPickups; k++) {
        this.addPickup();
      }
    },

    cleanGame: function () {
      //Initialize the grid model
      for (var i = 0; i < 25; i++) {
        this.grid[i] = [];
        for (var j = 0; j < 25; j++) {
          this.grid[i][j] = 0;
        }
      }
      
      var player;
      for (var key in this.playersHash){
        player = this.playersHash[key];
        player.points = 0;
        this.grid[player.getXPosition()][player.getYPosition()] = 1;
      }
      
      this.pickups.splice(0, this.pickups.length);
    },
    
    restartGame: function () {
      
      this.cleanGame();

      //Add pickups
      for (var k = 0; k < this.nbPickups; k++) {
        this.addPickup();
      }
      
      //Clean player points and update the grid model
      var player;
      for (var key in this.playersHash){
        player = this.playersHash[key];
        player.points = 0;
        this.grid[player.getXPosition()][player.getYPosition()] = 1;
      }


    },

  };

  Number.prototype.mod = function (n) {
    return ((this % n) + n) % n;
  };

  return Game;
});