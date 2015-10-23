define(function () {
  "use strict";

  function Game() {

    if (!(this instanceof Game)) {
      throw new TypeError("Game constructor cannot be called as a function.");
    }

    this.players = [];

  }

  Game.prototype = {

    constructor: Game,

    addPlayer: function (player) {
      this.players.push(player);
    },

    removePlayer: function (player) {
      this.players.splice(this.players.indexOf(player));
    },
  };

  return Game;

});