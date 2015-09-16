window.Trackstack = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    new Trackstack.Views.NavDropdown({el: $("#user-nav-dropdown") }).render()
    var collection =
      Trackstack.Collections.users = new Trackstack.Collections.Users()

    new Trackstack.Routers.Router({ $rootEl: $("#content"), collection: collection })
    Backbone.history.start();
  }
};
