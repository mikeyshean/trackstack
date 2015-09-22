Trackstack.Views.UserFeedItem = Backbone.CompositeView.extend({

  template: JST['feeds/sound-item'],
  commentTemplate: JST['feeds/comment'],

  events: {
    "click .like-button": "toggleLike",
    "click .add-to-playlist-button": "triggerModal",
    "click #repost-button": "toggleRepost",
    "mouseenter #audio-player": "showCommentField",
    "click .feed-comment-input": "clearInput",
    "submit .feed-comment-form": "submitComment"

  },

  tagName: "li",
  className: "sound-list-item group",

  initialize: function (options) {
    this.sound_type = this.model.get("sound_type");
    this.sound = this.model;
    if (this.sound instanceof Trackstack.Models.Playlist) {
      this.track = this.sound.get("tracks")[0]
    } else {
      this.track = this.sound
      this.comments = this.sound.comments();
    }

    this.playlists = options.playlists

    this.likers = this.sound.likers()

    var audioPlayerView = new Trackstack.Views.AudioPlayer({ trackUrl: this.track.track_url })
    this.addSubview("#audio-player", audioPlayerView)

    this.listenTo(this.likers, "add", this.updateLikeCount.bind(this, 1));
    this.listenTo(this.likers, "remove", this.updateLikeCount.bind(this, -1));
    this.listenTo(this.comments, "add", this.updateCommentCount.bind(this, 1));
    this.listenTo(this.comments, "remove", this.updateCommentCount.bind(this, -1));
    this.listenTo(this.likers, "reset", this.render);
  },

  render: function () {
    this.$el.html(this.template({
      sound: this.sound,
      sound_type: this.sound_type,
      img_url: this.sound.escape("feed_img") || this.track.feed_img,
      currentUser: Trackstack.currentUser
    }))
    this.delegateEvents();
    this.attachSubviews();

    return this;
  },

  triggerModal: function (e) {
    e.preventDefault();

    var trackId = $(e.currentTarget).data("id")
    var view = new Trackstack.Views.PlaylistModal({
      collection: this.playlists,
      trackId: trackId
    })
    $("#modal").html(view.render().$el);
    setTimeout(function () {
      $("#playlist-modal").addClass("transitioning")
      $(".modal-background").addClass("transitioning")
    },0)
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
  },

  updateCommentCount: function (incr) {
    var count = this.$("#comment-count").text()
    this.$("#comment-count").text(+count + incr);
  },

  showCommentField: function (e) {
    if (this.sound_type !== "Track") { return }

    this.$("#comment").html(this.commentTemplate())
    setTimeout(function () {
      this.$(".feed-comment-container").addClass("active");
    }.bind(this), 0)

    this.$el.off("mouseenter", "#audio-player")
    this.$(".feed-comment-input").keypress(function (e) {
      if (e.which == 13 || e.which == 11) {
        e.preventDefault();
        this.$(".feed-comment-form").submit();
      }
    }.bind(this))
  },

  submitComment: function (e) {
    e.preventDefault();
    var formData = $(e.currentTarget).serializeJSON()
    formData["comment"]["track_id"] = this.sound.id
    formData["comment"]["submitted_at"] = this.$(".player")[0].currentTime
    this.sound.comments().create(formData.comment, {
      success: function (model, response) {
        this.$(".feed-comment-input")
          .val("")
          .attr("placeholder", "Write a comment...")
      }.bind(this),
      error: function (model, response) {
        alert("Oops!  Your comment didn't go through. Try again.")
      }
    })
  },

  clearInput: function (e) {
    $(e.currentTarget).prop("placeholder", "")
  },


});
