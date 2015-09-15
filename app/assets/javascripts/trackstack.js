window.Trackstack = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var collection =
      Trackstack.Collections.users = new Trackstack.Collections.Users()

    new Trackstack.Routers.Router({ $rootEl: $("#main"), collection: collection })
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Trackstack.initialize();

});
