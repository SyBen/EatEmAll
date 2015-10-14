require(["service", "presenter"], function (service, presenter) {
  "use script";

  service.receive('askNick', function () {
    presenter.askNickname();
  });
  
  service.receive('updateUsers', function (data) {
    console.log(data);
    presenter.setUsers(data);
  });
  
});