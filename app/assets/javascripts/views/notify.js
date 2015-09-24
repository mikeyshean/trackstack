Trackstack.Views.Notify = Backbone.View.extend({

  template: JST['shared/notification'],

  initialize: function (options) {
    this.badgeImg = options.badgeImg,
    this.sound = options.sound;
  },

  render: function () {
    this.$el.html(this.template({ sound: this.sound, badgeImg: this.badgeImg }));
    return this;
  }

});
