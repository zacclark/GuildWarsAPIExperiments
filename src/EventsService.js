GWE.EventsService = (function() {
  function EventsService() {
  }

  EventsService.prototype.getWorlds = function(options) {
    var successCallback = options.success;

    var promise = $.ajax({
      url: "https://api.guildwars2.com/v1/world_names.json",
      type: "GET"
    });

    console.log(successCallback);

    promise.done(function (data, status, xhr) {
      console.log("test");
      successCallback(data);
    });
    promise.always(function() {
      console.log("hey")
    });
  };

  return EventsService;
})();