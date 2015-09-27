Trackstack.Collections.Likers = Backbone.Collection.extend({

  url: function () {
    if (this.soundType === "Track") {
      return "/api/tracks/" + this.soundId + "/likes"
    } else if (this.soundType === "Playlist") {
      return "/api/playlists/" + this.soundId + "/likes"
    }
  },

  model: Trackstack.Models.Liker,

  initialize: function(models, options) {
    this.soundId = options.soundId;
    this.soundType = options.soundType;
  }

});
