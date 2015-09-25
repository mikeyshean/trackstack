Trackstack.Views.PlaylistModal = Backbone.CompositeView.extend({

  template: JST['modals/playlist'],
  events: {
    "submit #new-playlist-form": "submit",
  },

  initialize: function (options) {
    this.trackId = this.model.id;
    this.collection = Trackstack.currentUser.playlists()
    this.collection.fetch({reset: true})
    this.listenTo(this.collection, "add", this.addPlaylistSubview)
    this.listenTo(this.collection, "reset", this.addPlaylistSubviews)
  },

  addPlaylistSubviews: function () {
    this.collection.each(function (playlist) {
      this.addPlaylistSubview(playlist);
    }.bind(this))
  },

  addPlaylistSubview: function (playlist) {
    if (!playlist.playlistTracks().length) { playlist.playlistTracks().set(playlist.get("tracks"))}
    var view = new Trackstack.Views.PlaylistModalItem({ playlist: playlist, trackId: this.trackId })
    this.addSubview("#my-playlists", view, true)
  },

  render: function () {
    this.$el.html(this.template({ track: this.model }));
    this.attachSubviews();
    return this;
  },

  submit: function (e) {
    e.preventDefault();
    var currentTarget = $(e.currentTarget)
    var formData = currentTarget.serializeJSON();
    formData.playlist["track_id"] = String(this.trackId)

    this.collection.create(formData.playlist, {
      success: function (model, response) {
        currentTarget.find("input").val("")
        this.$("#new-playlist-tab").click();
      }.bind(this),
      error: function (model, response) {

      },
      wait: true
    });

  }
})
