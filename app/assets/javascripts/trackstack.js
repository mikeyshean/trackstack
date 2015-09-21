window.Trackstack = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    this.currentUser = new Trackstack.Models.CurrentUser();
    this.currentUser.fetch();

    this.header = new Trackstack.Views.Header({ el: $("#header"), $modalEl: $("#modal")})

    new Trackstack.Routers.Router({ $rootEl: $("#content") })
    Backbone.history.start();
  }
};
