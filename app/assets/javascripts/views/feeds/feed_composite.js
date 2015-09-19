Trackstack.Views.FeedComposite = Backbone.CompositeView.extend({

  template: JST['feeds/user_feed'],

  initialize: function (options) {
    this.listenTo(this.collection, "add remove", this.addSoundSubview)
    this.listenTo(this.collection, "reset", this.addSoundSubviews)

  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  addSoundSubviews: function (collection) {
    this.collection.each(function (sound) {
      this.addSoundSubview(sound)
    }.bind(this))
  },

  addSoundSubview: function (model) {
    var view = new Trackstack.Views.UserFeedItem({model: model })
    this.addSubview(".feed-items", view);

  },

});
