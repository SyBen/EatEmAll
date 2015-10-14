define(["service"], function (service) {
  "use script";
  
  return {
        
    getGame: function () {
      service.send("getGame");
    },
    
    joinGame: function (nickname) {
    
      service.send("joinGame", nickname);
    
    },
    
    initializeSocketReceiver: function (command, callback) {
      service.receive(command, function (data) {
        callback(data);
      });
    }
    
  };

});