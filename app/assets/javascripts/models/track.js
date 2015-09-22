Trackstack.Models.Track = Backbone.Model.extend({
  urlRoot: "/api/tracks",

  initialize: function(options) {
    if (options && options.commenters) {
      this.comments().set(options.commenters)
    }

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
});
