Trackstack.Views.PlaylistModal = Backbone.CompositeView.extend({

  template: JST['modals/playlist'],
  events: {
    "click .css-file-input": "openFileBrowser",
    "submit form": "submit",
    "change .file-input-button": "fileInputChange"
  },

  initialize: function (options) {
    this.trackId = options.trackId;
    this.listenTo(this.collection, "add", this.addPlaylistSubview)

    this.addPlaylistSubviews();
  },

  addPlaylistSubviews: function () {
    this.collection.each(function (playlist) {
      this.addPlaylistSubview(playlist);
    }.bind(this))
  },

  addPlaylistSubview: function (model) {
    var view = new Trackstack.Views.PlaylistModalItem({ model: model, trackId: this.trackId })
    this.addSubview(".playlist-list-wrapper", view)
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  }
})
