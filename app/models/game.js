define(['app/models/player'], function (Player) {
  'use strict';

  function Game() {

    if (!(this instanceof Game)) {
      throw new TypeError('Game constructor cannot be called as a function.');
    }

    this.players = [];

  }

  Game.prototype = {

    constructor: Game,

    addPlayer: function (data) {
      var player = new Player(data);
      this.players.push(player);
      
      return this.players.indexOf(player);
    },

    removePlayer: function (player) {
      this.players.splice(this.players.indexOf(player));
    },
    
    getPlayers: function () {
      return this.players;
    },    
    
    getPlayerById: function (playerId) {
      return this.players[playerId];
    },
    
    setPlayerPosition: function (currentPlayerId, direction) {
      var currentPlayer = this.getPlayerById(currentPlayerId);
      var done;        
        
      if(direction === 'left'){ 
        console.log(currentPlayer.getNickname() + ' veut aller à gauche.');   
        console.log(currentPlayer.getXPosition() + ', ' + currentPlayer.getYPosition());   
      
        this.getPlayers.forEach( function (otherPlayer, otherPlayerId) {
          if(otherPlayer.getXPosition() === currentPlayer.getXPosition()-1){
            done = false;
          }
          else {
            currentPlayer.setXPosition(currentPlayer.getXPosition() - 1);
            done = true;
          }
        });
        
        console.log(currentPlayer.getXPosition() + ', ' + currentPlayer.getYPosition());   
      }
      else if(direction === 'right'){
        console.log(currentPlayer.getNickname() + ' veut aller à droite.');   
      }
      else if(direction === 'up'){
        console.log(currentPlayer.getNickname() + ' veut aller en haut.');  
      }
      else if(direction === 'down'){
        console.log(currentPlayer.getNickname() + ' veut aller en bas.');
      }
      
      return done;
    },
    
  };

  return Game;

});