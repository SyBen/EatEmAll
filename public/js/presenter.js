define(["view", "manager"], function (view, manager) {
  "use script";
  
  return {
    
    askNickname: function () {
    
      view.displayNicknameBox();
      this.onNicknameBoxSubmitHandler();
      
    },   
    
    setUsers: function (playersList) {
      view.emptyPlayersList();
      playersList.forEach( function (player) {
        view.addPlayer(player);
      });
      
      this.onNicknameBoxSubmitHandler();
      
    },
    
    /*************
    Listeners
    *************/
    
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
    },
    
    initializeGameListeners: function () {
      
      
    },
    
  };

});