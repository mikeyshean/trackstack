Trackstack.Views.UserFeedItem = Backbone.View.extend({

  template: {
    "Track": JST['feeds/track'],
    "Playlist": JST['feeds/playlist']
  },

  events: {
    "click .like-button": "toggleLike",
    "click #add-to-playlist-button": "triggerModal",
    "click #repost-button": "toggleRepost",
  },

  initialize: function (options) {
    this.sound_type = this.model.get("sound_type");
    this.sound = this.model.sound || this.model;

    this.likers = this.sound.likers([], { sound_id: this.sound.id, sound_type: this.sound_type })
    this.likers.fetch()
    this.listenTo(this.likers, "sync remove add", this.render)
  },

  render: function () {
    this.$el.html(this.template[this.sound_type]({
      sound: this.sound,
      sound_type: this.sound_type,
      currentUser: Trackstack.currentUser
    }))

    console.log("item");
    return this;
  },

  triggerModal: function (e) {
    e.preventDefault();
    this.model.trigger("showPlaylistModal")
  },

  toggleLike: function (e) {
    e.preventDefault();
    var $button = $(e.currentTarget)
    $button.attr("disabled", true)
    var beforeState = $button.data("like-state")

    $button.attr("like-state", !beforeState)
    $button.toggleClass("button-orange-border").addClass("disabled")

    if (beforeState) {
      var liker = this.likers.findWhere({ id: Trackstack.currentUser.id })

      liker.destroy({
        success: function () {
          $button.removeAttr("disabled");
        }
      })
    } else {
      this.likers.create({sound_type: this.sound_type, sound_id: this.sound_id}, {
        success: function () {
          $button.removeAttr("disabled");
        }
      })
    }
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
