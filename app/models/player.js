define(function () {
  "use strict";

  function Player(nickname) {

    if (!(this instanceof Player)) {
      throw new TypeError("Player constructor cannot be called as a function.");
    }

    this.nickname = nickname;
    this.position = {
      x: 0,
      y: 0
    };

    this.points = 0;

    console.log("Player " + this.nickname + " created !");

  }

  Player.prototype = {

    constructor: Player,

    getNickname: function () {
      return this.nickname;
    },

    getXPosition: function () {
      return this.position.x;
    },

    setXPosition: function (x) {
      this.position.x = x;
    },

    getYPosition: function () {
      return this.position.y;
    },

    setYPosition: function (y) {
      this.position.y = y;
    },

    getPoints: function () {
      return this.points;
    },

    setPoints: function (points) {
      this.points = points;
    },

    toString: function () {
      return "Player " + this.nickname + " in position (" + this.position.x + ", " + this.position.y + ") have " + this.points + " points.";
    }
  };

  return Player;

});