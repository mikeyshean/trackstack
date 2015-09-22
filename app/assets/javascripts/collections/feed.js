Trackstack.Collections.Feed = Backbone.Collection.extend({

  url: function () {
    return "api/users/" + this.user.id + "/" + this.feedType
  },

  initialize: function(models, options) {
    this.user = options.user;
    this.feedType = options.feedType;
  },

  model: function (attrs, options) {
    type = attrs.sound_type

    return new Trackstack.Models[type](attrs.sound)
  },

  modelId: function (attrs) {
    return attrs.sound_type + "-" + attrs.sound_id;
  }

});
