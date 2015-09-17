Trackstack.SoundModel = Backbone.Model.extend({
  initialize: function (options) {
    if (options.tracks) {
      this.tracks().set(options.tracks)
    }
  },

  tracks: function () {
    if (!this._tracks) {
      this._tracks = new Trackstack.Collections.PlaylistTracks([], { playlist_id: this.id })
    }

    return this._tracks;
  }

});
