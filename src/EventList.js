GWE.EventList = Backbone.View.extend({
  tagName: "table",
  template: _.template("<tr><th>ID</th><th>Name</th><th>State</th><th>Map Name</th></tr><% _(events).each(function(event) { %><tr><td><%= event.event_id %></td><td><%= event.name %></td><td><%= event.state %></td><td><%= event.map_name %></td></tr><% }) %>"),

  initialize: function (options) {
    this.collection.on("reset", this.render, this);
  },

  render: function () {
    this.$el.html(this.template({events: this.collection.toJSON()}));
  }
});