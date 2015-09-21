Trackstack.SoundModel = Backbone.Model.extend({

  initialize: function (options) {
    if (options && options.tracks) {
      this.playlistTracks().set(options.tracks, { silent: true })
    }

    if (options && options.commenters) {
      this.comments().set(options.commenters)
    }
  },

  playlistTracks: function () {
    if (!this._tracks) {
      this._tracks = new Trackstack.Collections.PlaylistTracks([], { playlist_id: this.id })
    }

    return this._tracks
  },

  likers: function (models, options) {
    if (!this._likers) {
      this._likers =
        new Trackstack.Collections.Likers([], options)
    }

    return this._likers;
  },

  saveFormData: function(formData, options){
    var method = this.isNew() ? "POST" : "PUT";
    var model = this;

    $.ajax({
      url: _.result(model, "url"),
      type: method,
      data: formData,
      processData: false,
      contentType: false,
      success: function(resp){
        model.set(model.parse(resp));
        model.trigger('sync', model, resp, options);
        options.success && options.success(model, resp, options);
      },
      error: function(resp){
        options.error && options.error(model, resp, options);
      }
    });
  },

  comments: function () {
    if (!this._comments) {
      this._comments = new Trackstack.Collections.Comments([], { track: this })
    }
    return this._comments
  }

});
