Trackstack.Views.FollowersIndex = Backbone.CompositeView.extend({

  template: JST['feeds/user_feed'],

  initialize: function (options) {
    this.listenTo(this.model, "add remove", this.addSoundSubview)
    this.listenTo(this.collection, "reset", this.addSoundSubviews)
    this.playlists = Trackstack.currentUser.playlists()
    this.playlists.fetch();
  },


});
