Trackstack.Collections.Playlists = Backbone.Collection.extend({

  url: function () {
    return "api/users/" + this.user_id + "/playlists"
  },

  model: Trackstack.Models.Playlist,

  initialize: function(models, options) {
    this.user_id = options.user_id
  }

});
