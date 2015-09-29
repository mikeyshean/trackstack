Trackstack.Views.LikeItem = Backbone.View.extend({

  template: JST['sidebar/like_item'],
  tagName: "li",
  className: "sidebar-item group",

  initialize: function (options) {
    this.sound = this.model
    if (this.sound instanceof Trackstack.Models.Playlist) {
      var firstTrack = this.sound.playlistTracks().first()
      this.trackUrl = firstTrack.escape("track_url")
      this.badgeUrl = firstTrack.escape("badge_img")
      this.trackId = firstTrack.id
    } else {
      this.trackUrl = this.sound.escape("track_url")
      this.badgeUrl = this.sound.escape("badge_img")
      this.trackId = this.sound.id

      this.comments = this.sound.comments()
    }

    this.likers = this.sound.likers()

    this.listenTo(this.likers, "add", this.updateLikeCount.bind(this, -1));
    this.listenTo(this.likers, "remove", this.updateLikeCount.bind(this, -1));
    this.listenTo(this.comments, "add", this.updateCommentCount.bind(this, 1));
    this.listenTo(this.comments, "remove", this.updateCommentCount.bind(this, -1));
  },

  render: function () {
    this.$el.html(this.template({ sound: this.model, trackId: this.trackId }));
    return this;
  },

  updateLikeCount: function (incr) {
    var count = this.$("#like-count").text()
    this.$("#like-count").text(+count + incr);
  },

  updateCommentCount: function (incr) {
    var count = this.$("#comment-count").text()
    this.$("#comment-count").text(+count + incr);
  },

});
