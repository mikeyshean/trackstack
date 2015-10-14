Trackstack.Views.FeedComposite = Backbone.CompositeView.extend({

  template: JST['feeds/user_feed'],

  initialize: function (options) {
    this.listenTo(this.collection, "add", this.addSoundSubview)
    this.listenTo(this.collection, "reset", this.addSoundSubviews)
    this.listenTo(this.collection, "playing", this.pausePlayers)

    this.attachInfiniteScroll();
  },

  events: {
    "click .feed-items": "fetchFeed"
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

  attachInfiniteScroll: function () {
    var $feed = this.$el
    $(window).scroll(function () {
      if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        this.collection.fetch();
      }
    }.bind(this))
  },

});
