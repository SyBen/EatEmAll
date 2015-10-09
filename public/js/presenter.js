define(["view"], function (view) {
  "use script";
  
  return {
    
    initializePlayer: function () {
    
      view.displayNicknameBox();
      
    
    },
    
    getNickname: function () {
    
      view.askNickname();
    
    },
    
  };

});