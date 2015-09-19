Trackstack.Views.PlaylistAdd = Backbone.View.extend({

  template: JST['modals/playlist_add'],
  events: {
    "click .css-file-input": "openFileBrowser",
    "submit form": "submit",
    "change .file-input-button": "fileInputChange"
  },

  initialize: function (options) {
    this.track = options.track;
    this.$el = $("#modal")
  },

  render: function () {
    this.$el.html(this.template({ track: this.track }));
    return this;
  }
})
