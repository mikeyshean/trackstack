Trackstack.Models.Playlist = Backbone.Model.extend({
  urlRoot: "api/playlists",

  initialize: function (options) {
    if (options && options.likes) {
      this.likers().set(options.likes)
    }

    if (options && options.tracks) {
      this.playlistTracks().set(options.tracks)
      delete this.tracks
    }
  },


  likers: function () {
    if (!this._likers) {
      this._likers =
        new Trackstack.Collections.Likers([], { sound: this, sound_type: "Playlist" })
    }

    return this._likers;
  },

  playlistTracks: function () {
    if (!this._playlistTracks) {
      this._playlistTracks =
        new Trackstack.Collections.PlaylistTracks([], { playlist_id: this.id })
    }

    return this._playlistTracks;
  },
});
