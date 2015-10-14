define(["view", "manager"], function (view, manager) {
  "use script";
  
  return {
    
    askNickname: function () {
    
      view.displayNicknameBox();
      this.onNicknameBoxSubmitHandler();
      
    },   
    
    setUsers: function (usersList) {
      view.emptyUsersList();
      usersList.forEach( function (user) {
        view.addUser(user);
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
    }
    
  };

});