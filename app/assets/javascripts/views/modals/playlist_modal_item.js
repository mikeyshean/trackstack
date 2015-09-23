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
    this.trackId = options.trackId
    this.listenTo(this.playlistTracks, "add remove", this.render)


  },

  render: function () {
    var addedState = !!this.playlistTracks.findWhere({ id: this.trackId })
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
      var playlistTrack = this.playlistTracks.findWhere({ id: this.trackId })

      playlistTrack.destroy({
        success: function () {
          $button.removeAttr("disabled");
        },
        error: function(model, response) {

        }.bind(this)
      })
    } else {
      this.playlistTracks.create({ track_id: this.trackId}, {
        success: function () {
          $button.removeAttr("disabled")
        },
        wait: true,
        error: function(model, response) {

        }.bind(this)
      })
    }
  }

})
