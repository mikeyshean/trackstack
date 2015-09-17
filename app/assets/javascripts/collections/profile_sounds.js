Trackstack.Collections.ProfileSounds = Backbone.Collection.extend({

  url: function () {
    return "api/users/" + this.user.id + "/feed"
  },

  model: Trackstack.SoundModel,

  initialize: function(models, options) {
    this.user = options.user;
    this.comparator = "updated_at";
  },

  parse: function (response) {
    var user = this.user
    var that = this
    var sound;

    if (response.length) {
      response.forEach(function (model) {
        if (model.sound_type === "Track") {
          sound = new Trackstack.Models.Track(model.sound);
          user.tracks().add(sound, {silent: true})
        } else if (model.sound_type === "Playlist") {
          sound = new Trackstack.Models.Playlist(model.sound);
          user.playlists().add(sound, {silent: true})
        }
        var feed = new Trackstack.SoundModel(model)

        feed.sound().set(model.sound)
        that.add(feed)
      })
      user.tracks().trigger("reset")
      delete response
    }
  }


  //
  //     this.user.tracks().set(response.tracks)
  //   }
  //
  //   if (response.tracks) {
  //     this.user.playlists().set(response.playlists)
  //   }
  //
  //   this.add(this.user.playlists().models)
  //   debugger
  //   this.set(this.user.tracks().models, { remove: false, merge: false })
  //   debugger
  // }

});
