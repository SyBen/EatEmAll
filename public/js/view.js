define([""], function () {
  "use script";
  
  return {
    
    displayNicknameBox: function () {
    
      $("#modalBox .modal-title").html("Bienvenue");
      
      $("#modalBox .modal-body").html("<form class=\"form-inline\"><div class=\"form-group\"><div class=\"input-group\"><input type=\"text\" name=\"nickname\" id=\"nickname\" placeholder=\"Entrez votre surnom\" class=\"form-control\"><br /><div class=\"input-group-addon\"><button class=\"btn\" type=\"submit\" value=\"Jouer !\"></div></div></div></form>");
    
      $('#modalBox').modal('show');
    },
    
  };

});