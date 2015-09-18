Trackstack.Views.CoverPhoto = Backbone.View.extend({

  template: JST['modals/cover_photo'],
  // className: "modal-background",

  initialize: function (options) {
  },

  render: function () {
    this.$el.html(this.template({ model: this.model }));
    return this;
  }

});
