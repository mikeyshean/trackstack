window.Trackstack = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    this.currentUser = new Trackstack.Models.CurrentUser();
    this.currentUser.fetch();

    this.header = new Trackstack.Views.Header({ el: $("#header"), $modalEl: $("#modal")})
    
    var collection =
      Trackstack.Collections.users = new Trackstack.Collections.Users()

    new Trackstack.Routers.Router({ $rootEl: $("#content"), collection: collection })
    Backbone.history.start();
  }
};
