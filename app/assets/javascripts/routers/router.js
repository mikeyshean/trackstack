Trackstack.Routers.Router = Backbone.Router.extend({

  routes: {
    "": "index",
    "_=_": "index",
    "users/:id": "show"
  },

  initialize: function (options) {
    this.collection = options.collection;
    this.$rootEl = options.$rootEl;
  },

  index: function () {
    this.collection.fetch();
    var view = new Trackstack.Views.UsersIndex({ collection: this.collection })
    this._swapView(view)
  },

  show: function (id) {
    var user = this.collection.getOrFetch(id);
    var feed = new Trackstack.Collections.ProfileSounds([], { user: user });
    var view = new Trackstack.Views.UserShow({ model: user, feed: feed });
    this._swapView(view);
    feed.fetch();
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
  }
});
