Trackstack.Views.UserFeedItem = Backbone.View.extend({

  template: {
    "Track": JST['feeds/track'],
    "Playlist": JST['feeds/playlist']
  },

  initialize: function () {
    this.sound_type = this.model.get("sound_type");
    this.sound = this.model.sound || this.model
  },

  render: function () {
    this.$el.html(this.template[this.sound_type]({ sound: this.sound, sound_type: this.sound_type }))
    console.log("item");
    return this;
  }

});
