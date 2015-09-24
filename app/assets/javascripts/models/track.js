Trackstack.Models.Track = Backbone.Model.extend({
  urlRoot: "/api/tracks",

  initialize: function(options) {
    if (options && options.likes) {
      this.likers().set(options.likes)
    }
  },

  comments: function () {
    if (!this._comments) {
      this._comments = new Trackstack.Collections.Comments([], { track: this })
    }
    return this._comments
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

  likers: function () {
    if (!this._likers) {
      this._likers =
        new Trackstack.Collections.Likers([], { sound: this, sound_type: "Track" })
    }

    return this._likers;
  },

  authorFollowers: function (author_id) {
    if (!this._followers) {
      this._followers = new Trackstack.Collections.Followers([], { user_id: author_id })
    }

    return this._followers
  },

  parse: function (resp){
    if (resp && resp.commenters) {
      this.comments().set(resp.commenters)
      delete resp.commenters
    }
    if (resp && resp.author_followers) {
      this.authorFollowers(resp.author_id).set(resp.author_followers)
      delete resp.author_followers
    }

    if (resp && resp.likers) {
      this.likers().set(resp.likers)
    }

    return resp;
  }
});
