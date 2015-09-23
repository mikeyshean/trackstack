Trackstack.Views.PlaylistModal = Backbone.CompositeView.extend({

  template: JST['modals/playlist'],
  events: {
    "click .css-file-input": "openFileBrowser",
    "submit form": "submit",
    "change .file-input-button": "fileInputChange"
  },

  initialize: function (options) {
    this.trackId = this.model.id;
    this.listenTo(this.collection, "add", this.addPlaylistSubview)

    this.addPlaylistSubviews();
  },

  addPlaylistSubviews: function () {
    this.collection.each(function (playlist) {
      this.addPlaylistSubview(playlist);
    }.bind(this))
  },

  addPlaylistSubview: function (playlist) {
    var view = new Trackstack.Views.PlaylistModalItem({ playlist: playlist, trackId: this.trackId })
    this.addSubview("#my-playlists", view)
  },

  render: function () {
    this.$el.html(this.template({ track: this.model }));
    this.attachSubviews();
    return this;
  }
})
