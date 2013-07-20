GWE.WorldPicker = Backbone.View.extend({
  tagName: "select",
  template: _.template("<% _(worlds).each(function(world) { %><option value='<%= world.id %>'><%= world.name %></option><% }) %>"),

  events: {
    "change": "worldWasPicked"
  },

  initialize: function (options) {
    this.collection.on("sync", this.render, this);
    this.eventsCollection = this.options.eventsCollection;
  },

  render: function () {
    var worlds = this.collection.toJSON();
    if (worlds.length == 0) {
      worlds = [{id: null, name: "Loading..."}];
    }
    this.$el.html(this.template({worlds: worlds}));
    this.$el.trigger("change");
  },

  worldWasPicked: function (e) {
    this.eventsCollection.changeWorld(this.$el.val());
  }
});