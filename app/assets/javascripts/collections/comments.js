Trackstack.Collections.Comments = Backbone.Collection.extend({

  url: function () {
    return "api/tracks/" + this.track.id + "/comments"
  },

  model: Trackstack.Models.Comment,

  initialize: function(models, options) {
    this.track = options.track
  }

});
