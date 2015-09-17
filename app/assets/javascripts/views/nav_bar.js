Trackstack.Views.NavBar = Backbone.View.extend({

  template: JST['nav_dropdown'],
  uploadTemplate: JST['modals/track_upload_modal'],

  initialize: function (options) {

    this.currentUserId = options.currentUserId;
    this.$modalEl = options.$modalEl;
    this.$navBarDropdown = options.$navBarDropdown;
  },

  events: {
    "click #upload": "uploadModal",
    "click #username": "showDropdown"
    // "click #content": "hideDropdown"
  },

  render: function () {
    // this.$navBarDropdown.append(this.template({ currentUserId: this.currentUserId }));
  },

  uploadModal: function (e) {
    var track = new Trackstack.Models.Track()
    this.$modalEl.html(this.uploadTemplate({ model: track }))
  },

  showDropdown: function (e) {
    e.preventDefault();
    var $currentTarget = $(e.currentTarget).addClass("active")
    var dropdown = this.$navBarDropdown.find(".nav-dropdown-wrapper")

    dropdown.html(this.template({ currentUserId: this.currentUserId }));

    $("#app").one("click", function (e) {
      $currentTarget.removeClass("active")
      this.$(".nav-dropdown-wrapper").empty();
    }.bind(this))
  },

  hideDropdown: function (e) {
    // debugger
    // this.$(".nav-dropdown-wrapper").empty();
  }

});
