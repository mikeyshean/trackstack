Trackstack.Routers.Router = Backbone.Router.extend({

  routes: {
    "": "index",
    "_=_": "index",
    "users/:id/followers": "followersIndex",
    "users/:id/following": "followingIndex",
    "users/:id": "show",
    "session/new": "signIn",
    "tracks/:id": "trackShow"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  index: function () {
    var callback = this.index.bind(this);
    if (!this._requireSignedIn(callback)) { return; }
    var feed = new Trackstack.Collections.Feed([], { user: Trackstack.currentUser, feedType: "mainfeed" });
    feed.fetch();
    var view = new Trackstack.Views.Index({ collection: feed })

    this._swapView(view)
  },

  show: function (id) {
    var callback = this.show.bind(this, id);
    if (!this._requireSignedIn(callback)) { return; }

    var user = new Trackstack.Models.User({id: id});

    var feed = new Trackstack.Collections.Feed([], { user: user, feedType: "profilefeed" });
    var view = new Trackstack.Views.UserShow({ model: user, feed: feed });
    user.fetch();
    // feed.fetch({reset: true});
    this._swapView(view);
  },

  trackShow: function (id) {
    var track = new Trackstack.Models.Track({ id: id });

    track.fetch({
      success: function (model, response) {
        var view = new Trackstack.Views.TrackShow({ model: model });
        this._swapView(view)
      }.bind(this)
    });


  },

  followersIndex: function (id) {
    var user = new Trackstack.Models.User({ id: id });

    user.fetch({
      success: function (model, response) {
        var view = new Trackstack.Views.SocialIndex({
          model: model,
          collection: model.followers(),
          type: "Followers" });
        this._swapView(view)
      }.bind(this)
    });
  },

  followingIndex: function (id) {
    var user = new Trackstack.Models.User({ id: id });

    user.fetch({
      success: function (model, response) {
        var view = new Trackstack.Views.SocialIndex({
          model: model,
          collection: model.followees(),
          type: "Following" });
        this._swapView(view)
      }.bind(this)
    });
  },

  _swapView: function (view) {
    if (this._currentView) {
      this._currentView.remove();
    }

    this._currentView = view
    this.$rootEl.html(view.render().$el)
  },

    signIn: function(callback){
    if (!this._requireSignedOut(callback)) { return; }

    var signInView = new Trackstack.Views.SignIn({
      callback: callback
    });
    this._swapView(signInView);
  },

  _requireSignedIn: function(callback){
    if (!Trackstack.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      this.signIn(callback);
      return false;
    }

    return true;
  },

  _requireSignedOut: function(callback){
    if (Trackstack.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    }

    return true;
  },

  _goHome: function(){
    Backbone.history.navigate("", { trigger: true });
  }

});
