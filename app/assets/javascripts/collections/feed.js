Trackstack.Collections.Feed = Backbone.Collection.extend({

  url: function () {
    return "api/users/" + this.user.id + "/" + this.feedType
  },

  model: Trackstack.SoundModel,

  initialize: function(models, options) {
    this.user = options.user;
    this.feedType = options.feedType;
  },

  parse: function (response) {
    var user = this.user
    var that = this
    var sound;

    if (response.length) {
      response.forEach(function (model) {
        if (model.sound_type === "Track") {
          sound = new Trackstack.Models.Track(model.sound);
        } else if (model.sound_type === "Playlist") {
          sound = new Trackstack.Models.Playlist(model.sound);
        }
        var feed = new Trackstack.SoundModel(model)

        feed.sound = sound
        that.add(feed, {silent: true})
      })

      delete response
    }
  }

});
