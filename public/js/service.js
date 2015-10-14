define(["socketio"], function (io) {
  "use script";
  
  return {
    
    _socket: io(),
    
    _commands: {
      
    },
    
    send: function (command, data) {
      this._socket.emit(command, data);
    },
    
    receive: function (command, callback) {
      this._socket.on(command, callback);
    },
    
  /*    initializeReceivers: function () {

        this.receive('askNick', function () {



        });

      }*/
    
  };

});