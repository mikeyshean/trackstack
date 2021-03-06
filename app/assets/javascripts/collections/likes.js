Trackstack.Collections.Likes = Backbone.Collection.extend({

  url: function () {
    return "api/users/" + this.user.id + "/likes"
  },

  initialize: function(models, options) {
    this.user = options.user;
    this.feedType = options.feedType;
  },

  model: function (attrs, options) {
    var type = attrs.sound_type
    var model = Trackstack.Models[type]

    return new model(attrs, {parse: true})
  },

  modelId: function (attrs) {
    return attrs.sound_type + "-" + attrs.id;
  }

});
