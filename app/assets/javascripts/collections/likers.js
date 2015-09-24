Trackstack.Collections.Likers = Backbone.Collection.extend({

  url: function () {
    if (this.sound_type === "Track") {
      return "/api/tracks/" + this.sound.id + "/likes"
    } else if (this.sound_type === "Playlist") {
      return "/api/playlists/" + this.sound.id + "/likes"
    }
  },

  model: Trackstack.Models.Liker,

  initialize: function(models, options) {
    this.sound = options.sound;
    this.sound_type =  options.sound_type;
  }

});
