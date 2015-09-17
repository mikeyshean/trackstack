Trackstack.SoundModel = Backbone.Model.extend({
  initialize: function (options) {
    if (options && options.tracks) {
      this.tracks().set(options.tracks, { silent: true })
    }
  },

  tracks: function () {
    if (!this._tracks) {
      this._tracks = new Trackstack.Collections.PlaylistTracks([], { playlist_id: this.id })
    }

    return this._tracks;
  },

  sound: function () {
    if (!this._sound) {
      this._sound = new Trackstack.SoundModel()
    }

    return this._sound;
  }

});
