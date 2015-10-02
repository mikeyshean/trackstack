Trackstack.Views.UserFeedItem = Backbone.CompositeView.extend({

  template: JST['feeds/sound-item'],
  commentTemplate: JST['feeds/comment'],
  notifyTemplate: JST['shared/notification'],
  submittedCommentTemplate: JST['feeds/submitted_comment'],

  events: {
    "click .like-button": "toggleLike",
    "click .add-to-playlist-button": "triggerModal",
    "click #repost-button": "toggleRepost",
    "mouseenter #audio-player": "showCommentField",
    "click .feed-comment-input": "clearInput",
    "submit .feed-comment-form": "submitComment",
    "blur .feed-comment-input": "addPlaceholder",
    "click a": "navigate",
    "click .playlist-tracks-item": "newTrack"

  },

  tagName: "li",
  className: "sound-list-item group",

  initialize: function (options) {
    this.sound_type = this.model.get("sound_type");
    this.sound = this.model;
    this.firstTrack = this.sound;
    this.playlistTracks;

    if (this.sound instanceof Trackstack.Models.Playlist) {
      var track = this.firstTrack = this.sound.playlistTracks().first()
      this.trackUrl = track.escape("track_url")
      this.badgeUrl = track.escape("badge_img")
      this.feedImg = track.escape("feed_img")
      this.trackId = track.id
      this.playlistTracks = this.sound.playlistTracks();
    } else {
      this.trackUrl = this.sound.escape("track_url")
      this.badgeUrl = this.sound.escape("badge_img")
      this.feedImg = this.sound.escape("feed_img")
      this.trackId = this.sound.id
      this.comments = this.sound.comments()
    }

    this.likers = this.sound.likers()

    this.waveSurfer = new Trackstack.Views.AudioPlayer({
      trackUrl: this.trackUrl,
      height: 70,
      track: this.firstTrack,
      sound: this.sound,
      playlistTracks: this.playlistTracks
    })

    this.addSubview("#audio-player", this.waveSurfer)
    this.isNotifying = false;

    this.listenTo(this.likers, "add", this.updateLikeCount.bind(this, 1));
    this.listenTo(this.likers, "remove", this.updateLikeCount.bind(this, -1));
    this.listenTo(this.likers, "notify", this.showNotification);
    this.listenTo(this.comments, "add", this.updateCommentCount.bind(this, 1));
    this.listenTo(this.comments, "remove", this.updateCommentCount.bind(this, -1));

  },

  render: function () {
    this.$el.html(this.template({
      sound: this.sound,
      sound_type: this.sound_type,
      img_url: this.feedImg,
      currentUser: Trackstack.currentUser,
      trackId: this.trackId
    }))
    this.delegateEvents();
    this.attachSubviews();

    return this;
  },

  triggerModal: function (e) {
    e.preventDefault();

    var view = new Trackstack.Views.PlaylistModal({
      model: this.sound
    })
    $("#modal").html(view.render().$el);
    setTimeout(function () {
      var background = $(".modal-background")
      $("#playlist-modal").addClass("transitioning")
      background.addClass("transitioning")
      background.on("click", function () {
        background.one("transitionend", function () {
          view.remove();
        })
      })

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
        success: function (model) {
          $button.removeAttr("disabled");
          Trackstack.currentUser.likes().remove(this.sound)
        }.bind(this)
      })
    } else {
      $button.attr("data-like-state", "true")
      this.likers.create({sound_type: this.sound_type, sound_id: this.sound.id}, {
        success: function (model) {
          this.likers.trigger("notify");
          $button.removeAttr("disabled");
          Trackstack.currentUser.likes().add(this.sound)
        }.bind(this)
      })
    }
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
    var player = this.waveSurfer.wave

    formData["comment"]["track_id"] = this.sound.id
    formData["comment"]["submitted_at"] = player.getCurrentTime()

    this.sound.comments().create(formData.comment, {
      success: function (model, response) {
        this.renderComment(model, player);
        this.$(".feed-comment-input")
          .val("")
          .attr("placeholder", "Write a comment...")
      }.bind(this),
      error: function (model, response) {
        alert("Oops!  Your comment didn't go through. Try again.")
      }
    })
  },

  renderComment: function (comment, player) {
    var value = 0;
    if (player.getCurrentTime() > 0) {
      value = Math.floor((player.getCurrentTime() / player.getDuration()) * 100)
    }
    var el = this.$(".submitted-comment")

    el.html(this.submittedCommentTemplate({ comment: comment }))
    el.css("left", value + "%" )
    el.addClass("transitioning")
    setTimeout(function () {
      el.removeClass("transitioning")
    }, 7000)

  },

  clearInput: function (e) {
    $(e.currentTarget).prop("placeholder", "")
  },

  addPlaceholder: function (e) {
   if ($(e.currentTarget).text().length) { return; }
   $(e.currentTarget).attr("placeholder", "Write a comment...")
  },

  showNotification: function () {
   var notify = $("#notification")
   var view = new Trackstack.Views.Notify({ sound: this.sound, badgeImg: this.badgeUrl })

   notify.append(view.render().$el)
   var alert = view.$(".sound-notification")
   setTimeout(function () {
     alert.addClass("active")
     setTimeout(function () {
       alert.removeClass("active")
       alert.on("transitionend",function () {
         view.remove()
       })
     },10000)
    }, 0)
  },

  navigate: function (e) {
    e.preventDefault();
    var url = $(e.currentTarget).attr("href");

    Backbone.history.navigate(url, { trigger: true })
  },

  newTrack: function (e) {
    e.preventDefault();
    var trackId = $(e.currentTarget).data("track-id");
    var track = this.playlistTracks.get(trackId);
    track.trigger("playTrack", track);
  }



});
