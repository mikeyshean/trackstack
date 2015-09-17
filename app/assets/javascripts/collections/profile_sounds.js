Trackstack.Collections.ProfileSounds = Backbone.Collection.extend({

  url: function () {
    return "api/users/" + this.user.id + "/feed"
  },

  model: Trackstack.SoundModel,

  initialize: function(models, options) {
    this.user = options.user
  },

  parse: function (response) {
    if (response.tracks) {
      this.user.tracks().set(response.tracks)
    }

    if (response.tracks) {
      this.user.playlists().set(response.playlists)
    }

    this.add(this.user.playlists().models)
    debugger
    this.set(this.user.tracks().models, { remove: false, merge: false })
    debugger
  }

});
