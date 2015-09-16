window.Trackstack = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $el = $("#user-nav-dropdown")
    var currentUserId = $el.data("id")

    new Trackstack.Views.NavDropdown({el: $el, currentUserId: currentUserId }).render()
    var collection =
      Trackstack.Collections.users = new Trackstack.Collections.Users()

    new Trackstack.Routers.Router({ $rootEl: $("#content"), collection: collection })
    Backbone.history.start();
  }
};
