Trackstack.Views.TrackShow = Backbone.CompositeView.extend({
  template: JST['tracks/show'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)

    var audioPlayerView = new Trackstack.Views.AudioPlayer({ trackUrl: this.model.escape("track_url"), model: this.model })
    this.addSubview("#track-show-player", audioPlayerView)

    this.comments = this.model.comments()
    this.attachCommentsComposite()
  },

  events: {
    "submit .feed-comment-form": "submitComment",
    "click #track-play": "togglePlay"
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


  render: function () {
    this.$el.html(this.template({ track: this.model }))
    this.attachSubviews();
    return this;
  },

  togglePlay: function () {
    this.$("#play").click();
    this.$(".track-show-button i").toggle();
  }
});
