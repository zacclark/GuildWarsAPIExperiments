GWE.Worlds = Backbone.Collection.extend({
  url: "https://api.guildwars2.com/v1/world_names.json",
  model: GWE.World
});