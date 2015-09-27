Trackstack.Views.AudioPlayer = Backbone.View.extend({

  template: JST["audio_player"],

  events: {
    "click #play": "togglePlay",
    "click #pause": "pause",
    "timeupdate .player": "updateProgress"
  },

  initialize: function (options) {
    this.trackUrl = options.trackUrl || this.model.escape("track_url");
    this.height = options.height
    // this.listenTo(this.model, "sync", this.extractTrackUrl);
  },

  togglePlay: function () {
    var playIcon = this.$(".play-icon");
    var pauseIcon = this.$(".pause-icon");

    if (!this.wave.isPlaying()) {
      $(".play-icon").show();
      $(".pause-icon").hide();

      this.wave.play();
      playIcon.hide();
      pauseIcon.show();
    } else {
      this.wave.pause();
      playIcon.show();
      pauseIcon.hide();
    }
  },


  render: function () {
    this.$el.html(this.template({ trackUrl: this.trackUrl }));

    var wave = Object.create(WaveSurfer);
    this.wave = wave

    wave.init({
        container: this.$('#audio')[0],
        waveColor: '#666',
        progressColor: '#f50',
        barWidth: 2,
        cursorColor: "#f50",
        cursorWidth: 0,
        normalize: true,
        height: this.height,
        fillParent: true,
        hideScrollbar: true
    });

    wave.on('ready', function () {
      this.$("#progress").addClass("transitioning")
      wave.seekTo(0)
    }.bind(this));

    wave.on('loading', function (percent, e) {
      this.updateProgress(percent)
    }.bind(this))

    $(window).resize(_.debounce(function(){
      wave.drawer.containerWidth = wave.drawer.container.clientWidth;
      wave.drawBuffer()
    }, 500));

    wave.load(this.trackUrl);
    return this;
  },

  updateProgress: function (percent) {
    this.$("#progress").css("width", percent + "%")
  },
  //
  // extractTrackUrl: function (model) {
  //   this.trackUrl = this.model.escape("track_url")
  //   this.render();
  // }
})
