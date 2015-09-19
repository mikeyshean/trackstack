Trackstack.Views.PlaylistModalItem = Backbone.View.extend({

  template: JST['modals/playlist_item'],
  events: {
    "click .playlist-add-button": "toggleAdd",
  },

  initialize: function (options) {
    this.playlistTracks = this.model.playlistTracks()
    this.trackId = options.trackId
    this.listenTo(this.playlistTracks, "add remove", this.render)

  },

  render: function () {
    var addedState = !!this.playlistTracks.findWhere({ id: this.trackId })
    this.$el.html(this.template({playlist: this.model, addedState: addedState}));
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
        }
      })
    } else {
      this.playlistTracks.create({ track_id: this.trackId}, {
        success: function () {
          $button.removeAttr("disabled")
        },
        wait: true
      })
    }
  }

})
