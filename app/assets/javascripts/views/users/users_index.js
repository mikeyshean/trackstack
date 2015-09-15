Trackstack.Views.UsersIndex = Backbone.View.extend({

  template: JST['users/index'],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render)
  },

  render: function () {
    this.$el.html(this.template({ users: this.collection }))
    return this;
  }

});
