Trackstack.Models.Track = Backbone.Model.extend({
  urlRoot: function () {
    this.collection.url();
  }
});
