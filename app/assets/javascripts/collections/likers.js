Trackstack.Collections.Likers = Backbone.Collection.extend({

  url: function () {
    if (this.sound_type === "Track") {
      return "/api/tracks/" + this.sound_id + "/likes"
    } else if (this.sound_type === "Playlist") {
      return "/api/playlists/" + this.sound_id + "/likes"
    }
  },

  model: Trackstack.Models.Liker,

  initialize: function(models, options) {
    this.sound_id = options.sound_id;
    this.sound_type = options.sound_type;

  }

});
