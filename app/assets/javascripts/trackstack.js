window.Trackstack = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    this.currentUser = new Trackstack.Models.CurrentUser();
    this.currentUser.fetch();

    this.header = new Trackstack.Views.Header({ el: $("#header"), $modalEl: $("#modal")})
    // var $navBarDropdown = $("#user-nav-dropdown");

    // new Trackstack.Views.Header({
    //   el: $("app"),
    //   currentUserId: currentUserId,
    //   $modalEl: $("#modal")
    // }).render()

    var collection =
      Trackstack.Collections.users = new Trackstack.Collections.Users()

    new Trackstack.Routers.Router({ $rootEl: $("#content"), collection: collection })
    Backbone.history.start();
  }
};
