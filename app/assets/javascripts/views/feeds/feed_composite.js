Trackstack.Views.FeedComposite = Backbone.CompositeView.extend({

  template: JST['feeds/user_feed'],

  initialize: function (options) {
    // this.sound_type = this.model.sound_type;
    // this.sound = this.model.sound()
    // this.listenTo(this.collection, "sync", this.render)
    // debugger
    // this.feedType = options.feedType;

    this.listenTo(this.collection, "add remove", this.addSoundSubview)
    this.listenTo(this.collection, "reset", this.addSoundSubviews)

  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  addSoundSubviews: function (collection) {
    // debugger
    this.collection.each(function (sound) {
      this.addSoundSubview(sound)
    }.bind(this))
  },

  addSoundSubview: function (model) {
    // debugger

    var view = new Trackstack.Views.UserFeedItem({model: model })
    this.addSubview(".feed-items", view);

  },

});
