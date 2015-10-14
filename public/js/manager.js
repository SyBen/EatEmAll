define(["service"], function (service) {
  "use script";
  
  return {
    
    initializeConnection: function () {
      
      service.send('initializeConnection');
      
    },
    
    sendNickname: function (nickname, callback) {
    
      service.send('setNick', nickname, function(data) {
        callback(data);
      });
    
    },
    
  };

});