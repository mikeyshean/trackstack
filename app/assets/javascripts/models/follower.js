Trackstack.Models.Follower = Backbone.Model.extend({
  urlRoot: function () {
    this.collection.url();
  }
});
