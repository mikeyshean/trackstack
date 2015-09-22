Trackstack.Views.FeedComposite = Backbone.CompositeView.extend({

  template: JST['feeds/user_feed'],

  initialize: function (options) {
    this.listenTo(this.collection, "add remove", this.addSoundSubview)
    this.listenTo(this.collection, "reset", this.addSoundSubviews)
    this.playlists = Trackstack.currentUser.playlists()
    this.playlists.fetch();
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  addSoundSubviews: function (collection) {
    this.collection.each(function (sound) {
      if (!this.isEmptyPlaylist(sound)) {
        this.addSoundSubview(sound)
      }
    }.bind(this))
  },

  addSoundSubview: function (model) {
    if (!this.isEmptyPlaylist(model)) {
      var view = new Trackstack.Views.UserFeedItem({model: model, playlists: this.playlists })
      this.addSubview(".feed-items", view);
    }

  },

  isEmptyPlaylist: function(model) {
    model instanceof Trackstack.Models.Playlist &&
      model.get("tracks").length === 0
  }

});
