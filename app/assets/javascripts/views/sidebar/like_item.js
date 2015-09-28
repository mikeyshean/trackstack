Trackstack.Views.LikeItem = Backbone.View.extend({

  template: JST['sidebar/like_item'],
  tagName: "li",
  className: "sidebar-item group",

  initialize: function (options) {

  },

  events: {
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    return this;
  },


});
