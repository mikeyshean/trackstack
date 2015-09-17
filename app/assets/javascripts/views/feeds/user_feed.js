Trackstack.Views.UserFeed = Backbone.View.extend({

  template: JST['feeds/user_feed'],

  render: function () {
    console.log(this.model.urlRoot)
    this.$el.html("<h1>" + this.model.escape("title") + "</h1>")
  }

});
