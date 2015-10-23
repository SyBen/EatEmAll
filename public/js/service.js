define(["socketio"], function (io) {
  "use script";

  return {

    _socket: null,

    _commands: {

    },

    initializeConnection: function () {
      this._socket = io();
      console.log("Socket connectée au serveur");
    },

    send: function (command, data) {
      this._socket.emit(command, data);
    },

    receive: function (command, data) {
      this._socket.on(command, data);
    },


  };

});