Trackstack.Routers.Router = Backbone.Router.extend({

  routes: {
    "": "index",
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
    var user = this.collection.getOrFetch(id)
    var view = new Trackstack.Views.UserShow({ model: user })
    this._swapView(view)
  },

  _swapView: function (view) {
    if (this._currentView) {
      this._currentView.remove();
    }

    this._currentView = view
    this.$rootEl.html(view.render().$el)
  }
});