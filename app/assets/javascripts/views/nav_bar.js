Trackstack.Views.NavBar = Backbone.View.extend({

  template: JST['nav_dropdown'],
  uploadTemplate: JST['modals/track_upload_modal'],

  initialize: function (options) {

    this.currentUserId = options.currentUserId;
    this.$modalEl = options.$modalEl;
    this.$navBarDropdown = options.$navBarDropdown;
  },

  events: {
    "click #upload": "uploadModal"
  },

  render: function () {
    this.$navBarDropdown.append(this.template({ currentUserId: this.currentUserId }));
  },

  uploadModal: function (e) {
    var track = new Trackstack.Models.Track()
    this.$modalEl.html(this.uploadTemplate({ model: track }))
  }

});
