Trackstack.Models.Follower = Backbone.Model.extend({

  initialize: function (options) {
    // this.followee_id = options.id;
  },
  // urlRoot: "api/users/" + this.followee_id + "/followers"
  urlRoot: function () {
    this.collection.url();
  }
});
