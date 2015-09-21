Trackstack.Views.AudioPlayer = Backbone.View.extend({

  template: JST["audio_player"],

  events: {
    "click #play": "play",
    "click #pause": "pause",
    "timeupdate #player": "updateProgress"
  },

  initialize: function (options) {
    this.trackUrl = options.trackUrl;
  },

  play: function () {
    this.player.play();
    this.$("#player").on("timeupdate", this.updateProgress.bind(this))
  },

  pause: function () {
    this.player.pause();
  },

  render: function () {
    this.$el.html(this.template({ trackUrl: this.trackUrl }));
    this.player = this.$el.find("#player")[0];
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
