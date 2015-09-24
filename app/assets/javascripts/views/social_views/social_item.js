Trackstack.Views.SocialItem = Backbone.View.extend({

  template: JST['social/social_item'],
  tagName: "li",

  initialize: function (options) {
  },

  render: function () {
    this.$el.html(this.template({ social: this.model}));
    return this;
  }

});
