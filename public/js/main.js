require(["service", "presenter"], function (service, presenter) {
  "use script";

  service.initializeConnection();
  presenter.getNickname();
  
});