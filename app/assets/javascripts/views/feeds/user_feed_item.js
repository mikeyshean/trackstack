Trackstack.Views.UserFeedItem = Backbone.CompositeView.extend({

  template: JST['feeds/sound-item'],

  events: {
    "click .like-button": "toggleLike",
    "click .add-to-playlist-button": "triggerModal",
    "click #repost-button": "toggleRepost",
  },

  tagName: "li",
  className: "sound-list-item group",

  initialize: function (options) {
    this.sound_type = this.model.get("sound_type");
    this.sound = this.model.sound || this.model;
    if (this.sound.get("tracks")) {
      this.track = this.sound.get("tracks")[0]
    } else {
      this.track = this.sound
    }

    this.likers = this.sound.likers([], { sound: this.sound })
    this.likers.fetch({reset: true})

    var audioPlayerView = new Trackstack.Views.AudioPlayer({ trackUrl: this.sound.escape("track_url") || this.track.track_url })
    this.addSubview("#audio-player", audioPlayerView)

    this.listenTo(this.likers, "add", this.updateLikeCount.bind(this, 1));
    this.listenTo(this.likers, "remove", this.updateLikeCount.bind(this, -1));
    this.listenTo(this.likers, "reset", this.render);
  },

  render: function () {
    this.$el.html(this.template({
      sound: this.sound,
      sound_type: this.sound_type,
      img_url: this.sound.escape("feed_img") || this.track.feed_img,
      currentUser: Trackstack.currentUser
    }))
    this.attachSubviews();

    console.log("item");
    return this;
  },

  triggerModal: function (e) {
    e.preventDefault();

    var trackId = $(e.currentTarget).data("id")
    var playlists = Trackstack.currentUser.playlists()
    playlists.fetch();
    var view = new Trackstack.Views.PlaylistModal({
      collection: playlists,
      trackId: trackId
    })
    $("#modal").html(view.render().$el);
    setTimeout(function () {
      $(".modal-background").addClass("transitioning")
      $("#playlist-modal").addClass("transitioning")
    }.bind(this),0)
  },

  toggleLike: function (e) {
    e.preventDefault();
    var $button = $(e.currentTarget)
    $button.attr("disabled", true)
    $button.toggleClass("button-orange-border").addClass("disabled")

    var beforeState = $button.attr("data-like-state")
    if (beforeState === "true") {
      $button.attr("data-like-state", "false")
      var liker = this.likers.findWhere({ id: Trackstack.currentUser.id })

      liker.destroy({
        success: function () {
          $button.removeAttr("disabled");
        }
      })
    } else {
      $button.attr("data-like-state", "true")
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

  },

  updateLikeCount: function (incr) {
    var count = this.$("#like-count").text()
    this.$("#like-count").text(+count + incr);
  }

});
