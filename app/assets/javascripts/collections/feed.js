Trackstack.Collections.Feed = Backbone.Collection.extend({

  url: function () {
    return "api/users/" + this.user.id + "/" + this.feedType + "/" + this.oldest_entry
  },

  initialize: function(models, options) {
    this.user = options.user;
    this.feedType = options.feedType;
  },

  model: function (attrs, options) {
    var type = attrs.sound_type
    var model = Trackstack.Models[type]
    return new model(attrs, options)
  },

  modelId: function (attrs) {
    return attrs.sound_type + "-" + attrs.id;
  },

  parse: function (resp) {
    this.oldest_entry = resp.oldest_entry || this.oldest_entry
    return resp.feed
  }

});
