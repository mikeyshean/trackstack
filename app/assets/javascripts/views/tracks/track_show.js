Trackstack.Views.TrackShow = Backbone.CompositeView.extend({
  template: JST['tracks/show'],

  initialize: function () {

    this.listenTo(this.model, "sync", this.render)
    this.listenTo(this.model.authorFollowers(), "add", this.updateFollowerCount.bind(this, 1))
    this.listenTo(this.model.authorFollowers(), "remove", this.updateFollowerCount.bind(this, -1))
    this.listenTo(this.model.comments(), "add", this.updateCommentCount.bind(this, 1))
    this.listenTo(this.model.comments(), "remove", this.updateCommentCount.bind(this, -1))

    this.likers = this.model.likers();
    this.attachAudioPlayer();
    this.comments = this.model.comments()
    this.attachCommentsComposite()
  },

  events: {
    "submit .feed-comment-form": "submitComment",
    "click #track-play": "togglePlay",
    "click .follow-button": "toggleFollowState",
    "click .like-button": "toggleLike",
  },

  submitComment: function (e) {
    e.preventDefault();
    var formData = $(e.currentTarget).serializeJSON()
    formData["comment"]["track_id"] = this.model.id
    formData["comment"]["submitted_at"] = this.$(".player")[0].currentTime
    this.comments.create(formData.comment, {
      success: function (model, response) {
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

  updateFollowerCount: function (incr) {
    var count = this.$("#follower-count").text()
    this.$("#follower-count").text(+count + incr);
  },

  updateCommentCount: function (incr) {
    var count = this.$("#comment-count").text()
    this.$("#comment-count").text(+count + incr);
  },
});
