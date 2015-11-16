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

    addPlayer: function (data) {
      var player = new Player(data);
      this.players.push(player);

      grid[player.getXPosition][player.getYPosition] = this.players.indexOf(player);

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
      var possible = true;

      if(direction === 'left'){
        console.log(currentPlayer.getNickname() + ' veut aller à gauche.');

        this.getPlayers().forEach( function (otherPlayer, otherPlayerId) {
          if(otherPlayerId != currentPlayerId){
            if((otherPlayer.getXPosition() === currentPlayer.getXPosition()-1)&&(otherPlayer.getYPosition() === currentPlayer.getYPosition())){
              possible = false;
            }
          }
        });

        if(possible)
          currentPlayer.setXPosition(currentPlayer.getXPosition() - 1);

      }
      else if(direction === 'right'){
        console.log(currentPlayer.getNickname() + ' veut aller à droite.');

        this.getPlayers().forEach( function (otherPlayer, otherPlayerId) {
          if(otherPlayerId != currentPlayerId){
            if((otherPlayer.getXPosition() === currentPlayer.getXPosition()+1)&&(otherPlayer.getYPosition() === currentPlayer.getYPosition())){
              possible = false;
            }
          }
        });

        if(possible)
          currentPlayer.setXPosition(currentPlayer.getXPosition() + 1);


      }
      else if(direction === 'up'){
        console.log(currentPlayer.getNickname() + ' veut aller en haut.');

        this.getPlayers().forEach( function (otherPlayer, otherPlayerId) {
          if(otherPlayerId != currentPlayerId){
            if((otherPlayer.getYPosition() === currentPlayer.getYPosition()+1)&&(otherPlayer.getXPosition() === currentPlayer.getXPosition())){
              possible = false;
            }
          }
        });

        if(possible)
          currentPlayer.setYPosition(currentPlayer.getYPosition() + 1);


      }
      else if(direction === 'down'){
        console.log(currentPlayer.getNickname() + ' veut aller en bas.');


        this.getPlayers().forEach( function (otherPlayer, otherPlayerId) {
          if(otherPlayerId != currentPlayerId){
            if((otherPlayer.getYPosition() === currentPlayer.getYPosition()-1)&&(otherPlayer.getXPosition() === currentPlayer.getXPosition())){
              possible = false;
            }
          }
        });

        if(possible)
          currentPlayer.setYPosition(currentPlayer.getYPosition() - 1);


      }
      console.log(currentPlayer.getXPosition() + ', ' + currentPlayer.getYPosition());

      return possible;
    },

  };

  return Game;

});
