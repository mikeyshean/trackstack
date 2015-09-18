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
  }

});
