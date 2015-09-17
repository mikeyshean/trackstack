Trackstack.Collections.ProfileSounds = Backbone.Collection.extend({

  url: function () {
    return "api/users/" + this.user_id + "/feed"
  },

  model: Trackstack.SoundModel,

  initialize: function(models, options) {
    this.user_id = options.user_id
  }

});
