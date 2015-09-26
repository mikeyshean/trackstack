Trackstack.Views.TrackShow = Backbone.CompositeView.extend({
  template: JST['tracks/show'],
  submittedCommentTemplate: JST['feeds/submitted_comment'],
  initialize: function () {
    this.likers = this.model.likers();

    this.listenTo(this.model, "sync", this.render)
    this.listenTo(this.model.authorFollowers(), "add", this.updateFollowerCount.bind(this, 1))
    this.listenTo(this.model.authorFollowers(), "remove", this.updateFollowerCount.bind(this, -1))
    this.listenTo(this.comments, "add", this.updateCommentCount.bind(this, 1))
    this.listenTo(this.comments, "remove", this.updateCommentCount.bind(this, -1))
    this.listenTo(this.likers, "notify", this.showNotification);

    this.attachAudioPlayer();
    this.comments = this.model.comments()
    this.attachCommentsComposite()
  },

  events: {
    "submit .feed-comment-form": "submitComment",
    "click #track-play": "togglePlay",
    "click .follow-button": "toggleFollowState",
    "click .like-button": "toggleLike",
    "click .add-to-playlist-button": "triggerModal",
    "click .feed-comment-input": "clearInput",
    "blur .feed-comment-input": "addPlaceholder",
  },

  submitComment: function (e) {
    e.preventDefault();
    var formData = $(e.currentTarget).serializeJSON()
    var player = this.$(".player")[0]
    var currentTime = player.currentTime

    formData["comment"]["track_id"] = this.model.id
    formData["comment"]["submitted_at"] = currentTime
    this.comments.create(formData.comment, {
      success: function (model, response) {
        this.renderComment(model, player);
        this.$(".feed-comment-input")
          .val("")
          .attr("placeholder", "Write a comment...")
      }.bind(this),
      error: function (model, response) {
        alert("Oops!  Your comment didn't go through. Try again.")
      },
      wait: true
    })
  },

  renderComment: function (comment, player) {
    var value = 0;
    if (player.currentTime > 0) {
      value = Math.floor((player.currentTime / player.duration) * 100)
    }
    var el = this.$(".submitted-comment")

    el.html(this.submittedCommentTemplate({ comment: comment }))
    el.addClass("track-show")
    el.css("left", value + "%" )
    el.addClass("transitioning")
    setTimeout(function () {
      el.removeClass("transitioning")
    }, 5000)

  },

  attachCommentsComposite: function () {
    var view = new Trackstack.Views.CommentComposite({ collection: this.comments })
    this.addSubview("#comments", view)
  },
  attachAudioPlayer: function () {
    var audioPlayerView =
      new Trackstack.Views.AudioPlayer({
        trackUrl: this.model.escape("track_url"),
        model: this.model
      })
    this.addSubview("#track-show-player", audioPlayerView)
  },

  render: function () {
    this.$el.html(this.template({ track: this.model }))
    this.attachSubviews();
    return this;
  },

  togglePlay: function () {
    this.$("#play").click();
    this.$(".track-show-button i").toggle();
  },

  toggleFollowState: function (e) {
    e.preventDefault()

    var $followButton = $(e.currentTarget)
    $followButton.attr("disabled", true)
    var beforeState = $followButton.attr("data-follow-state")
    $followButton.toggleClass("button-orange-border")

    if (beforeState === "true") {
      $followButton.attr("data-follow-state", "false")
      var follower = this.model.authorFollowers().findWhere({ id: Trackstack.currentUser.id })
      follower.destroy({
        success: function (model) {
          $followButton.removeAttr("disabled");

        },
        error: function (model, response) {


        }.bind(this)
      })
    } else {
      $followButton.attr("data-follow-state", "true")
      this.model.authorFollowers().create({followee_id: this.model.get("author_id") }, {
        success: function (model) {
          $followButton.removeAttr("disabled");


        },
        wait: true,
        error: function (model, response) {

        }.bind(this)
      })
    }
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

  clearInput: function (e) {
    $(e.currentTarget).prop("placeholder", "")
  },

  triggerModal: function (e) {
    e.preventDefault();
    var view = new Trackstack.Views.PlaylistModal({
      collection: Trackstack.currentUser.playlists(),
      model: this.model
    })
    $("#modal").html(view.render().$el);
    setTimeout(function () {
      $("#playlist-modal").addClass("transitioning")
      $(".modal-background").addClass("transitioning")
    },0)
  },

  updateFollowerCount: function (incr) {
    var count = this.$("#follower-count").text()
    this.$("#follower-count").text(+count + incr);
  },

  updateCommentCount: function (incr) {
    var count = this.$("#comment-count").text()
    this.$("#comment-count").text(+count + incr);
  },

  addPlaceholder: function (e) {
   if ($(e.currentTarget).text().length) { return; }
   $(e.currentTarget).attr("placeholder", "Write a comment...")
 },


  showNotification: function () {
    var notify = $("#notification")
    var view = new Trackstack.Views.Notify({ sound: this.model, badgeImg: this.model.escape("badge_img"), type: "Like" })

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
});
