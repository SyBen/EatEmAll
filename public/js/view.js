define([""], function () {
  "use script";
  
  return {
    
    emptyPlayersList: function (user) {
      $("#usersDescriptionBox").empty();
    },   
    
    addPlayer: function (player) {
      $("#usersDescriptionBox").append("<li>"+ player._nickname +"</li>");
    },
    
    displayNicknameBox: function () {
    
      $("#modalBox .modal-title").html("Bienvenue");
      
      $("#modalBox .modal-body").html("<form class=\"form-inline\" id=\"nicknameBox\"><div class=\"input-group\"><input type=\"text\" name=\"nickname\" id=\"nickname\" placeholder=\"Entrez votre surnom\" class=\"form-control\"><span class=\"input-group-btn\"><button id=\submitNicknameBtn\" class=\"btn\" type=\"submit\">Jouer !</button></span></div></form>");
    
      $('#modalBox').modal('show');
    },  
    
    hideNicknameBox: function () {
    
      $("#modalBox .modal-title").html("");
      
      $("#modalBox .modal-body").html("");
    
      $('#modalBox').modal("hide");
    },
    
  };

});