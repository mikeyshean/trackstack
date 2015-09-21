Trackstack.Views.AudioPlayer = Backbone.View.extend({

  template: JST["audio_player"],

  events: {
    "click #play": "togglePlay",
    "click #pause": "pause",
    "timeupdate .player": "updateProgress"
  },

  initialize: function (options) {
    this.trackUrl = options.trackUrl;
  },

  togglePlay: function () {
    var playIcon = this.$(".play-icon");
    var pauseIcon = this.$(".pause-icon");

    if (this.player.paused) {
      $(".player").each(function () {
        this.pause();
      })

      $(".play-icon").show();
      $(".pause-icon").hide();
      this.player.play();
      playIcon.hide();
      pauseIcon.show();
    } else {
      this.player.pause();
      playIcon.show();
      pauseIcon.hide();
    }

    this.$(".player").on("timeupdate", this.updateProgress.bind(this))
  },

  pause: function () {
    this.$("#play .audio-icon").hide()
    this.$("#pause .audio-icon").show()
    this.player.pause();
  },

  render: function () {
    this.$el.html(this.template({ trackUrl: this.trackUrl }));
    this.player = this.$el.find(".player")[0];
    return this;
  },

  updateProgress: function () {
    var player = this.player;
    var value = 0;
    if (player.currentTime > 0) {
      value = Math.floor((player.currentTime / player.duration) * 100)
    }
    this.$("#progress").css("width", value + "%")
  }
})
