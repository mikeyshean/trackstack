window.Trackstack = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    this.currentUser = new Trackstack.Models.CurrentUser();
    this.currentUser.fetch({
      success: function (model) {
        this.header = new Trackstack.Views.Header({ el: $("#header"), $modalEl: $("#modal")})

        Trackstack.router = new Trackstack.Routers.Router({ $rootEl: $("#content"), currentUser: model })
        Backbone.history.start();

      }
    });
  }
};
