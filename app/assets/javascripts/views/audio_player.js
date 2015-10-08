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
    this.peaksUrl = options.peaksUrl || this.track.escape("peaks_url")
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
      cursorColor: "#f50",
      cursorWidth: 0,
      normalize: true,
      height: this.height,
      fillParent: true,
      hideScrollbar: true,
      backend: 'MediaElement',
      pixelRatio: 1,
      minimap: true
    });
  },

  attachWaveListeners: function (autoplay) {
    this.wave.on('ready', function () {
      // this.$("#progress").addClass("transitioning")
      // this.$("#progress").one("transitionend", function () {
      //   this.$("#progress").removeClass("transitioning").css("width", 0)
      // }.bind(this))

      this.wave.seekTo(0)

      if (autoplay) {
        this.wave.play();
        this.hidePlay();
      }

      // if (!this.peaksUrl.length) {
        var peaks = this.wave.backend.getPeaks(900)
        var params = {}
        debugger
        params["peaks"] = JSON.stringify(peaks);

        this.track.save(params)
      // }

      $(window).resize(_.debounce(function(){
        this.wave.drawer.containerWidth = this.wave.drawer.container.clientWidth;
        this.wave.drawBuffer()
      }.bind(this), 700));
    }.bind(this));

    // this.wave.on('loading', function (percent, e) {
    //   this.updateProgress(percent)
    // }.bind(this))

    this.wave.on("finish", function () {
      if (this.playlistTracks) {
        var nextIdx = this.playlistTracks.indexOf(this.track) + 1
        if (nextIdx < this.playlistTracks.length) {
          this.playTrack(this.playlistTracks.at(nextIdx))
        }
      }

      this.showPlay();
      $("#track-play .play-icon").show();
      $("#track-play .pause-icon").hide();
    }.bind(this));
  },

  playTrack: function (track) {
    this.trackUrl = track.escape("track_url");
    this.track = track;
    this.peaksUrl = this.track.escape("peaks_url")
    this.loadPlayer();
    this.attachWaveListeners(true);
  },

  loadPlayer: function () {
    // if (this.peaksUrl.length) {
    //   this.wave.util.ajax({
    //     responseType: 'json',
    //     url: this.peaksUrl
    //   }).on('success', function (data) {
    //     this.wave.load(
    //         this.trackUrl,
    //         data
    //     );
    //   }.bind(this));
    // } else {
      this.wave.load(this.trackUrl);
    }
  // }

})
