Trackstack.Routers.Router = Backbone.Router.extend({

  routes: {
    "": "index",
    "_=_": "index",
    "users/:id/followers": "followersIndex",
    "users/:id/following": "followingIndex",
    "users/:id/likes": "likesIndex",
    "users/:id/:type": "show",
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

    var feed = new Trackstack.Collections.Feed([], {
      user: Trackstack.currentUser,
      feedType: "mainfeed"
    })

    feed.fetch({ reset: true })
    var view = new Trackstack.Views.Index({
      collection: feed,
      model: Trackstack.currentUser
    })

    this._swapView(view)

  },

  show: function (id, type) {
    var callback = this.show.bind(this, id, type);
    if (!this._requireSignedIn(callback)) { return; }
    var user = new Trackstack.Models.User({id: id});
    var feed = new Trackstack.Collections.Feed([], { user: user, feedType: "profilefeed" });
    var view = new Trackstack.Views.UserShow({ model: user, totalFeed: feed, feedType: type });
    user.fetch();

    this._swapView(view);
    setTimeout(function () {
      view.$el.find("#" + type).addClass("active")
    }, 0)
  },

  trackShow: function (id) {
    var callback = this.trackShow.bind(this, id);
    if (!this._requireSignedIn(callback)) { return; }

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

  likesIndex: function (id) {
    var user = new Trackstack.Models.User({ id: id });
    user.fetch({
      success: function (model, response) {
        var view = new Trackstack.Views.SocialIndex({
          model: model,
          collection: model.likes(),
          type: "Likes" });

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

    window.scroll(0, 0)
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
