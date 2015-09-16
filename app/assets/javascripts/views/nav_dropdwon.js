Trackstack.Views.NavDropdown = Backbone.View.extend({

  template: JST['nav_dropdown'],

  initialize: function (options) {
    this.currentUserId = options.currentUserId
  },

  render: function () {
    // this.$el.empty()
    this.$el.append(this.template({ currentUserId: this.currentUserId }))
  }

});
