Trackstack.Collections.Followers = Backbone.Collection.extend({
  url: "api/users/" + this.userId + "/followers",
  model: Trackstack.Models.User

});
