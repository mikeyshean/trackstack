Trackstack.Collections.Tracks = Backbone.Collection.extend({

  url: function () {
    return "api/users/" + this.user_id + "/tracks"
  },

  model: Trackstack.Models.Track,

  initialize: function(models, options) {
    this.user_id = options.user_id
  }

});
