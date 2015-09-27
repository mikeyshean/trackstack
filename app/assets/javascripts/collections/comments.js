Trackstack.Collections.Comments = Backbone.Collection.extend({

  url: function () {
    return "api/tracks/" + this.trackId + "/comments"
  },

  model: Trackstack.Models.Comment,

  initialize: function(models, options) {
    this.trackId = options.trackId
  }

});
