Trackstack.Collections.Followables = Backbone.Collection.extend({
  model: Trackstack.Models.User,
  url: function () {
    return "api/followables/"
  },
})
