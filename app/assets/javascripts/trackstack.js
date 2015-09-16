window.Trackstack = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $el = $("#nav");
    var $navBarDropdown = $("#user-nav-dropdown");
    var currentUserId = $navBarDropdown.data("id");

    new Trackstack.Views.NavBar({
      el: $el,
      currentUserId: currentUserId,
      $navBarDropdown: $navBarDropdown,
      $modalEl: $("#modal")
    }).render()

    var collection =
      Trackstack.Collections.users = new Trackstack.Collections.Users()

    new Trackstack.Routers.Router({ $rootEl: $("#content"), collection: collection })
    Backbone.history.start();
  }
};
