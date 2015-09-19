Trackstack.Collections.Likers = Backbone.Collection.extend({

  url: function () {
    return this.sound.url() + "/likes"
  },

  model: Trackstack.Models.Liker,

  initialize: function(models, options) {
    this.sound = options.sound;
  }

});
