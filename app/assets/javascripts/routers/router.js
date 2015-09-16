Trackstack.Routers.Router = Backbone.Router.extend({

  routes: {
    "": "index",
    "users/:id": "show",
    "users/:id/tracks/new": "tracksNew"
  },

  initialize: function (options) {
    this.collection = options.collection;
    this.$rootEl = options.$rootEl;
    this.$modalEl = this.$rootEl.find("#modal")
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

  tracksNew: function (id) {
    var track = new Trackstack.Models.Track()
    var view = new Trackstack.Views.TrackUpload({ model: track })
    this._appendModal(view)
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
