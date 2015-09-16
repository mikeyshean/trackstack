Trackstack.Collections.Followees = Backbone.Collection.extend({

  url: function () {
    return "api/users/" + this.user_id + "/followees"
  },

  model: Trackstack.Models.Followee,

  initialize: function(models, options) {
    this.user_id = options.user_id
  }

});
