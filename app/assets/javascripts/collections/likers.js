Trackstack.Collections.Likers = Backbone.Collection.extend({

  url: function () {
    return "api/" + this.sound_type + "/" + this.sound_id + "/likers"
  },

  model: Trackstack.Models.Liker,

  initialize: function(models, options) {
    this.sound_id = options.sound_id;
    this.sound_type = options.sound_type;
  }

});
