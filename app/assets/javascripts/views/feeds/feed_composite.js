Trackstack.Views.FeedComposite = Backbone.CompositeView.extend({

  template: JST['feeds/user_feed'],

  initialize: function () {
    // this.sound_type = this.model.sound_type;
    // this.sound = this.model.sound()
    this.listenTo(this.collection, "sync", this.render)
    this.listenTo(this.collection, "add", this.addSoundSubview)
    this.collection.each(function (sound) {
      this.addSoundSubview(sound)
    }.bind(this))
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
  },

  addSoundSubview: function (model) {
    var view = new Trackstack.Views.UserFeedItem({model: model })
    this.addSubview(".feed-items", view);
  },

});
