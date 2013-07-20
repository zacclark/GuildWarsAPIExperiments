GWE.Events = Backbone.Collection.extend({
  initialize: function (options) {
    this.worldID = options && options.worldID;
  },

  changeWorld: function(newWorldID) {
    this.worldID = newWorldID;
    this.fetch();
  },

  parse: function (response) {
    return response.events;
  },

  fetch: function(options) {
    if (this.worldID == undefined || this.worldID == "" || this.worldID == null) {
      this.reset([]);
      return;
    }

    var collection = this;

    var rawEvents = [];
    var eventNames = [];
    var mapNames = [];

    var eventsPromise = $.ajax({url: "https://api.guildwars2.com/v1/events.json?world_id=" + this.worldID});
    eventsPromise.done(function(data){ rawEvents = data.events; });
    var eventNamesPromise = $.ajax({url: "https://api.guildwars2.com/v1/event_names.json?world_id=" + this.worldID});
    eventNamesPromise.done(function(data){ eventNames = data; });
    var mapNamesPromise = $.ajax({url: "https://api.guildwars2.com/v1/map_names.json"});
    mapNamesPromise.done(function(data){ mapNames = data; });

    var allDone = function() {
      if (rawEvents.length > 0 && eventNames.length > 0 && mapNames.length > 0) {
        _(rawEvents).each(function(rawEvent){
          var eventNameObj = _(eventNames).find(function(eventName){
            return eventName.id === rawEvent.event_id;
          });
          var i = 0;
          var mapNameObj = _(mapNames).find(function(mapName){
            return mapName.id == rawEvent.map_id;
          });

          if (eventNameObj) { rawEvent.name = eventNameObj.name; }
          if (mapNameObj) {
            window.test = mapNameObj;
            rawEvent.map_name = mapNameObj.name;
          }
        });

        collection.reset(rawEvents);
      }
    };

    eventsPromise.done(allDone);
    eventNamesPromise.done(allDone);
    mapNamesPromise.done(allDone);
  }
});