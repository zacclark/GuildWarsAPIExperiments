GWE.WorldPicker = Backbone.View.extend({
  tagName: "select",
  template: _.template("<% _(worlds).each(function(world) { %><option value='<%= world.id %>'><%= world.name %></option><% }) %>"),

  events: {
    "change": "worldWasPicked"
  },

  initialize: function (options) {
    this.collection.on("add remove change", this.render, this);
  },

  render: function () {
    var worlds = this.collection.toJSON();
    if (worlds.length == 0) {
      worlds = [{id: null, name: "Loading..."}];
    }
    this.$el.html(this.template({worlds: worlds}));
  },

  worldWasPicked: function (e) {
    console.log(this.$el.val());
  }
});