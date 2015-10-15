Trackstack.Views.TrackShow = Backbone.CompositeView.extend({

  template: JST['tracks/show'],

  submittedCommentTemplate: JST['feeds/submitted_comment'],

  initialize: function () {
    this.likers = this.model.likers();
    this.comments = this.model.comments();
    this.sound = this.model;
    this.followee_id = this.model.get("author_id");
    this.followers = this.model.authorFollowers();

    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.authorFollowers(), "add", this.updateFollowerCount.bind(this, 1));
    this.listenTo(this.model.authorFollowers(), "remove", this.updateFollowerCount.bind(this, -1));
    this.listenTo(this.comments, "add", this.updateCommentCount.bind(this, 1));
    this.listenTo(this.comments, "remove", this.updateCommentCount.bind(this, -1));
    this.listenTo(this.likers, "notify", this.showNotification);

    this.attachAudioPlayer();
    this.attachCommentsComposite()
  },

  events: {
    "submit .feed-comment-form": "submitComment",
    "click #track-play": "togglePlay",
    "click .follow-button": "toggleFollow",
    "click .like-button": "toggleLike",
    "click .add-to-playlist-button": "triggerModal",
    "click .feed-comment-input": "clearInput",
    "blur .feed-comment-input": "addPlaceholder",
  },

  submitComment: function (e) {
    e.preventDefault();
    var formData = $(e.currentTarget).serializeJSON()
    var player = this.waveSurfer.wave
    var currentTime = player.getCurrentTime()

    formData["comment"]["track_id"] = this.model.id
    formData["comment"]["submitted_at"] = player.getCurrentTime()
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
    if (player.getCurrentTime() > 0) {
      value = Math.floor((player.getCurrentTime() / player.getDuration()) * 100)
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
    this.waveSurfer =
      new Trackstack.Views.AudioPlayer({
        trackUrl: this.model.escape("track_url"),
        peaksUrl: this.model.escape("peaks_url"),
        sound: this.model,
        track: this.model,
        height: 110
      })
    this.addSubview("#track-show-player", this.waveSurfer)
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

  toggleFollow: function (e) {
    Trackstack.Util.toggleFollow(e, this)
  },

  toggleLike: function (e) {
    Trackstack.Util.toggleLike(e, this)
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
