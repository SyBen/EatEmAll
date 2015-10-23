define(["service"], function (service) {
  "use script";

  return {

    initializeConnection: function () {

      service.initializeConnection();

    },

    getGame: function () {
      service.send("getGame");
    },

    joinGame: function (nickname) {

      service.send("joinGame", nickname);

    },
    
    goTo: function (direction) {
      service.send("goTo", direction);
    },

    initializeSocketReceiver: function (command, callback) {
      service.receive(command, function (data) {
        callback(data);
      });
    }

  };

});