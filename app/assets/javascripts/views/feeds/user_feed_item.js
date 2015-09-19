Trackstack.Views.UserFeedItem = Backbone.View.extend({

  template: {
    "Track": JST['feeds/track'],
    "Playlist": JST['feeds/playlist']
  },

  events: {
    "click #like-button": "toggleLike",
    "click #add-to-playlist-button": "triggerModal",
    "click #repost-button": "toggleRepost",
  },

  initialize: function (options) {
    this.sound_type = this.model.get("sound_type");
    this.sound = this.model.sound || this.model;

  },

  render: function () {
    this.$el.html(this.template[this.sound_type]({ sound: this.sound, sound_type: this.sound_type }))
    console.log("item");
    return this;
  },

  triggerModal: function (e) {
    e.preventDefault();
    this.model.trigger("showPlaylistModal")
  },

  showPlaylistModal: function (model) {

    var playlists = this.model.getOrFetch()
    var view = new Trackstack.Views.TrackUpload({ model: track })
    this.$modalEl.html(view.render().$el)

    setTimeout(function () {
      $(".modal-background").addClass("transitioning")
      $("#track-upload").addClass("transitioning")
    }.bind(this),0)

  }

});
