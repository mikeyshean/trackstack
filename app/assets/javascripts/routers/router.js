Trackstack.Routers.Router = Backbone.Router.extend({

  routes: {
    "": "index",
    "_=_": "index",
    "users/:id": "show",
    "session/new": "signIn"
  },

  initialize: function (options) {
    this.collection = options.collection;
    this.$rootEl = options.$rootEl;
  },

  index: function () {
    var callback = this.index.bind(this);
    if (!this._requireSignedIn(callback)) { return; }

    this.collection.fetch();
    var view = new Trackstack.Views.UsersIndex({ collection: this.collection })
    this._swapView(view)
  },

  show: function (id) {
    var callback = this.show.bind(this, id);
    if (!this._requireSignedIn(callback)) { return; }
    
    var user = this.collection.getOrFetch(id);
    var feed = new Trackstack.Collections.ProfileFeed([], { user: user });
    feed.fetch();
    var view = new Trackstack.Views.UserShow({ model: user, feed: feed });
    this._swapView(view);
  },

  _swapView: function (view) {
    if (this._currentView) {
      this._currentView.remove();
    }

    this._currentView = view
    this.$rootEl.html(view.render().$el)
  },

  _appendModal: function (view) {
    if (this._currentModal) {
      this._currentModal.remove();
    }

    this._currentModal = view
    this.$modalEl.html(view.render().$el)
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
