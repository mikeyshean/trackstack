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
    "click a": "navigate"

  },

  tagName: "li",
  className: "sound-list-item group",

  initialize: function (options) {
    this.sound_type = this.model.get("sound_type");
    this.sound = this.model;

    if (this.sound instanceof Trackstack.Models.Playlist) {
      this.trackUrl = this.sound.get("tracks")[0].track_url
      this.badgeUrl = this.sound.get("tracks")[0].badge_img
      this.feedUrl = this.sound.get("tracks")[0].feed_img
    } else {
      this.trackUrl = this.sound.escape("track_url")
      this.badgeUrl = this.sound.escape("badge_img")
      this.feedUrl = this.sound.escape("feed_img")
      this.comments = this.sound.comments();
    }

    this.likers = this.sound.likers()

    var audioPlayerView = new Trackstack.Views.AudioPlayer({ trackUrl: this.trackUrl })
    this.addSubview("#audio-player", audioPlayerView)
    this.isNotifying = false;

    this.listenTo(this.likers, "add", this.updateLikeCount.bind(this, 1));
    this.listenTo(this.likers, "remove", this.updateLikeCount.bind(this, -1));
    this.listenTo(this.likers, "notify", this.showNotification);
    this.listenTo(this.comments, "add", this.updateCommentCount.bind(this, 1));
    this.listenTo(this.comments, "remove", this.updateCommentCount.bind(this, -1));
    this.listenTo(this.likers, "reset", this.render);
  },

  render: function () {
    this.$el.html(this.template({
      sound: this.sound,
      sound_type: this.sound_type,
      img_url: this.feedUrl,
      currentUser: Trackstack.currentUser
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
        success: function (model) {
          this.likers.trigger("notify");
          $button.removeAttr("disabled");
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
    var player = this.$(".player")[0]
    var currentTime = player.currentTime
    var duration = player.duration

    formData["comment"]["track_id"] = this.sound.id
    formData["comment"]["submitted_at"] = currentTime
    this.sound.comments().create(formData.comment, {
      success: function (model, response) {
        this.renderComment(model, duration);
        this.$(".feed-comment-input")
          .val("")
          .attr("placeholder", "Write a comment...")
      }.bind(this),
      error: function (model, response) {
        alert("Oops!  Your comment didn't go through. Try again.")
      }
    })
  },

  renderComment: function (comment, duration) {
    if (duration) {
      var delta = comment.get("submitted_at") / duration
    }
    // debugger
    var el = this.$(".submitted-comment")

    el.html(this.submittedCommentTemplate({ comment: comment }))
    el.css("left", (delta * 100) + "%" )
    el.addClass("transitioning")
    setTimeout(function () {
      el.removeClass("transitioning")
    }, 5000)

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
  }



});
