window.Trackstack = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    this.currentUser = new Trackstack.Models.CurrentUser();
    this.currentUser.fetch();
    this.header = new Trackstack.Views.Header({ el: $("#header"), $modalEl: $("#modal")})

    Trackstack.router = new Trackstack.Routers.Router({ $rootEl: $("#content") })
    Backbone.history.start();
  }
};
