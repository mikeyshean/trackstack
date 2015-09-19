Trackstack.Models.User = Backbone.Model.extend({
  urlRoot: "api/users",

  parse: function (response) {
    if (response.followers) {
      this.followers().set(response.followers);
      delete response.followers;
    }

    if (response.followees) {
      this.followees().set(response.followees);
      delete response.followees;
    }

    if (response.tracks) {
      this.tracks().set(response.tracks);
      delete response.tracks;
    }

    if (response.playlists) {
      this.playlists().set(response.playlists);
      delete response.playlists;
    }

    return response;
  },

  toJSON: function () {
    var json = {user: _.clone(this.attributes)};
    return json;
  },

  followers: function () {
    if (!this._followers) {
      this._followers = new Trackstack.Collections.Followers([], { user_id: this.id })
    }

    return this._followers
  },

  followees: function () {
    if (!this._followees) {
      this._followees = new Trackstack.Collections.Followees([], { user_id: this.id })
    }

    return this._followees
  },

  tracks: function () {
    if (!this._tracks) {
      this._tracks = new Trackstack.Collections.Tracks([], { user_id: this.id })
    }

    return this._tracks
  },

  playlists: function () {
    if (!this._playlists) {
      this._playlists = new Trackstack.Collections.Playlists([], { user_id: this.id })
    }

    return this._playlists
  },

  feed: function () {
    if (!this._feed) {
      this._feed = new Trackstack.Collections.ProfileFeed([], { user: this })
    }

    return this._feed
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
