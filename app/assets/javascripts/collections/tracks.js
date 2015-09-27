Trackstack.Collections.Tracks = Backbone.Collection.extend({

  url: function () {
    return "api/users/" + this.userId + "/tracks"
  },

  model: Trackstack.Models.Track,

  initialize: function(models, options) {
    this.userId = options.user_id
  },

});
