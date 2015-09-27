Trackstack.Collections.PlaylistTracks = Backbone.Collection.extend({

  url: function () {
    return "api/playlists/" + this.playlistId + "/tracks"
  },

  model: Trackstack.Models.PlaylistTrack,

  initialize: function(models, options) {
    this.playlistId = options.playlistId
  }

});
