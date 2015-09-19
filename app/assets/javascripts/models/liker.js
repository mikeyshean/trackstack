Trackstack.Models.Liker = Backbone.Model.extend({
  urlRoot: function () {
    this.collection.url();
  }
});
