Trackstack.Models.Playlist = Backbone.Model.extend({
  urlRoot: "api/playlists",

  parse: function (resp) {
    if (resp && resp.likers) {
      this.likers(resp.id).set(resp.likers)

      delete resp.likers
    }
    if (resp && resp.tracks) {
      this.playlistTracks(resp.id).set(resp.tracks)

      delete resp.tracks
    }
    return resp
  },


  likers: function (playlistId) {
    if (!this._likers) {
      this._likers = new Trackstack.Collections.Likers([], {
        soundId: playlistId,
        soundType: "Playlist"
      })
    }

    return this._likers;
  },

  playlistTracks: function (playlistId) {
    if (!this._playlistTracks) {
      this._playlistTracks =
        new Trackstack.Collections.PlaylistTracks([], { playlistId: playlistId })
    }

    return this._playlistTracks;
  },
});
