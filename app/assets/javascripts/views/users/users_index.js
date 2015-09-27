Trackstack.Views.Index = Backbone.CompositeView.extend({

  template: JST['users/index'],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render)
    var view = new Trackstack.Views.FeedComposite({collection: this.collection, feedType: "All"})
    this.addSubview("#feed", view)
  },

  render: function () {
    this.$el.html(this.template({ user: Trackstack.currentUser }))
    this.attachSubviews();
    return this;
  }
});
