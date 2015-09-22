Trackstack.Models.PlaylistTrack = Backbone.Model.extend({
  urlRoot: function () {
    this.collection.url();
  }
});
