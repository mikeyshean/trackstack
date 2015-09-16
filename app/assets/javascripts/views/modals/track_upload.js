Trackstack.Views.TrackUpload = Backbone.View.extend({

  template: JST['track_upload_modal'],
  className: "modal-background",

  initialize: function (options) {
  },

  render: function () {
    this.$el.html(this.template({ track: this.model }))
  }

});
