Trackstack.Views.Notify = Backbone.View.extend({

  template: JST['shared/notification'],

  initialize: function (options) {
    this.badgeImg = options.badgeImg,
    this.sound = options.sound;
    this.type = options.type
    this.playlistTitle = options.playlistTitle
  },

  render: function () {
    this.$el.html(this.template({
      sound: this.sound,
      badgeImg: this.badgeImg,
      type: this.type,
      playlistTitle: this.playlistTitle
     }));
    return this;
  }

});
