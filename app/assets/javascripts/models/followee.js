Trackstack.Models.Followee = Backbone.Model.extend({
  urlRoot: function () {
    this.collection.url();
  }
});
