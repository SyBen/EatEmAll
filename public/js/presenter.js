define(["view", "manager"], function (view, manager) {
  "use script";
  
  return {
    
    initializePlayer: function () {
    
      view.displayNicknameBox();
      this.onNicknameBoxSubmitHandler();
      
    },
    
    onNicknameBoxSubmitHandler: function() {
      
      $("#nicknameBox").on('submit', function (evt) {
        evt.preventDefault();
        var nickname = $("#nickname").val();
        
        if(nickname.length > 0) {
          manager.sendNickname(nickname);
          view.hideNicknameBox();
        }
        else {
          view.displayNicknameBox();
        }
          
      });
    }
    
  };

});