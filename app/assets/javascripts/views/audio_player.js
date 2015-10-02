Trackstack.Views.AudioPlayer = Backbone.View.extend({

  template: JST["audio_player"],

  events: {
    "click #play": "togglePlay",
    "click #pause": "pause",
    "timeupdate .player": "updateProgress"
  },

  initialize: function (options) {
    this.trackUrl = options.trackUrl || this.model.escape("track_url");
    this.playlistTracks = options.playlistTracks;
    this.track = options.track;
    this.sound = options.sound;
    this.height = options.height;
    this.listenTo(this.playlistTracks, "playTrack", this.playTrack)
  },

  togglePlay: function () {
    var playIcon = this.$(".play-icon");
    var pauseIcon = this.$(".pause-icon");

    if (!this.wave.isPlaying()) {
      this.sound.trigger("playing")

      this.wave.play();
      this.hidePlay();
    } else {
      this.wave.pause();
      this.showPlay();
    }
  },

  showPlay: function () {
    this.$(".play-icon").show();
    this.$(".pause-icon").hide();
  },

  hidePlay: function () {
    this.$(".play-icon").hide();
    this.$(".pause-icon").show();
  },

  pause: function () {
    if (this.wave.isPlaying()) {
      this.wave.pause();
      this.showPlay();
    }
  },

  render: function () {
    this.$el.html(this.template({ trackUrl: this.trackUrl }));
    this.wave || this.initializeWave();

    this.wave.load(this.trackUrl);
    this.attachWaveListeners();

    return this;
  },

  updateProgress: function (percent) {
    this.$("#progress").css("width", percent + "%")
  },

  initializeWave: function () {
    this.wave = Object.create(WaveSurfer);
    this.wave.init({
      container: this.$('#audio')[0],
      waveColor: '#919191',
      progressColor: '#f50',
      barWidth: 2,
      cursorColor: "#f50",
      cursorWidth: 0,
      normalize: true,
      height: this.height,
      fillParent: true,
      hideScrollbar: true
    });
  },

  attachWaveListeners: function (autoplay) {
    this.wave.on('ready', function () {
      this.$("#progress").addClass("transitioning")
      this.$("#progress").one("transitionend", function () {
        this.$("#progress").removeClass("transitioning").css("width", 0)
      }.bind(this))

      this.wave.seekTo(0)

      if (autoplay) {
        this.wave.play();
        this.hidePlay();
      }

      $(window).resize(_.debounce(function(){
        wave.drawer.containerWidth = wave.drawer.container.clientWidth;
        wave.drawBuffer()
      }, 700));
    }.bind(this));

    this.wave.on('loading', function (percent, e) {
      this.updateProgress(percent)
    }.bind(this))

    this.wave.on("finish", function () {
      if (this.playlistTracks) {
        var nextIdx = this.playlistTracks.indexOf(this.track) + 1
        if (nextIdx < this.playlistTracks.length) {
          this.playTrack(this.playlistTracks.at(nextIdx))
        }
      }
      this.showPlay();
    }.bind(this));
  },

  playTrack: function (track) {
    this.trackUrl = track.escape("track_url");
    this.track = track;
    this.wave.load(this.trackUrl);
    this.attachWaveListeners(true);
  }

})
