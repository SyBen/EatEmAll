require(["presenter", "manager"], function (presenter, manager) {
  "use script";
  
  manager.initializeConnection();
    
  presenter.initializeReceivers();
  
  presenter.askToJoinGame();
  
});