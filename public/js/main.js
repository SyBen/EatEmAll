require(["service", "presenter"], function (service, presenter) {
  "use script";

  service.receive('askNick', function () {
    presenter.askNickname();
  });
  
});