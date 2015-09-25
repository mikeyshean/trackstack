Trackstack.Views.PlaylistModalItem = Backbone.View.extend({

  template: JST['modals/playlist_item'],
  events: {
    "click .playlist-add-button": "toggleAdd",
  },
  tagName: "li",
  className: "group playlist-item",

  initialize: function (options) {
    this.playlist = options.playlist
    this.playlistTracks = this.playlist.playlistTracks()
    this.track = options.track
    this.listenTo(this.playlistTracks, "add remove", this.render)
    this.listenTo(this.playlistTracks, "notify", this.showNotification)


  },

  render: function () {
    var addedState = !!this.playlistTracks.findWhere({ id: this.track.id })
    if (this.playlistTracks && this.playlistTracks.first()) {
      this.playlistImg = this.playlistTracks.first().escape("badge_img")
    }
    this.$el.html(this.template({playlist: this.playlist, playlistImg: this.playlistImg, addedState: addedState}));

    return this;
  },

  toggleAdd: function (e) {
    e.preventDefault();

    var $button = $(e.currentTarget)
    $button.attr("disabled", true)
    var beforeState = $button.data("added-state")

    $button.attr("added-state", !beforeState)

    if (beforeState) {
      var playlistTrack = this.playlistTracks.findWhere({ id: this.track.id })

      playlistTrack.destroy({
        success: function () {
          $button.removeAttr("disabled");
        },
        error: function(model, response) {

        }.bind(this)
      })
    } else {
      this.playlistTracks.create({ track_id: this.track.id}, {
        success: function (model) {
          model.trigger("notify");
          $button.removeAttr("disabled")
        },
        wait: true,
        error: function(model, response) {

        }.bind(this)
      })
    }
  },

  showNotification: function (track) {
    var notify = $("#notification")
    var view = new Trackstack.Views.Notify({
      sound: this.track,
      badgeImg: this.track.escape("badge_img"),
      type: "Playlist",
      playlistTitle: this.playlist.escape("title")
    })

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

})
