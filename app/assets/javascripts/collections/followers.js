Trackstack.Collections.Followers = Backbone.Collection.extend({

  url: function () {
    return "api/users/" + this.user_id + "/followers"
  },

  model: Trackstack.Models.Follower,

  initialize: function(models, options) {
    this.user_id = options.user_id
  },

});
