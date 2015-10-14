Trackstack.Views.FeedComposite = Backbone.CompositeView.extend({

  template: JST['feeds/user_feed'],

  initialize: function (options) {
    this.listenTo(this.collection, "add", this.addSoundSubview)
    this.listenTo(this.collection, "reset", this.addSoundSubviews)
    this.listenTo(this.collection, "playing", this.pausePlayers)
  },

  events: {
    "click .feed-items": "fetchFeed"
  },

  fetchFeed: function (e) {
    console.log("fetch");
    e.preventDefault();
    this.collection.fetch();
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  addSoundSubviews: function () {
    this.collection.each(function (sound) {
      this.addSoundSubview(sound)
    }.bind(this))
  },

  addSoundSubview: function (model) {
    if (!this.isEmptyPlaylist(model)) {
      var view = new Trackstack.Views.UserFeedItem({model: model})
      this.addSubview(".feed-items", view);
    }
  },

  isEmptyPlaylist: function(model) {
    return model instanceof Trackstack.Models.Playlist &&
      model.playlistTracks().length === 0
  },

  pausePlayers: function () {
    this.eachSubview(function (subview, selector) {
      subview.waveSurfer.pause();
    })
  },

});
