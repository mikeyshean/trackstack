Trackstack.Collections.PlaylistTracks = Backbone.Collection.extend({

  url: function () {
    return "api/playlists/" + this.playlist_id + "tracks"
  },

  model: Trackstack.SoundModel,

  initialize: function(models, options) {
    this.playlist_id = options.playlist_id
  }

});