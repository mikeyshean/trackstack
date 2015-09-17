Trackstack.Views.UserFeed = Backbone.View.extend({

  template: JST['feeds/user_feed'],

  initialize: function () {
    this.sound_type = this.model.sound_type;
    this.sound = this.model.sound()
  },

  render: function () {
    this.$el.html("<h1>" + this.sound.escape("title") + "</h1>")
  }

});
