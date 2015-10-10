Trackstack.Views.Index = Backbone.CompositeView.extend({

  template: JST['users/index'],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render)

    var feedView = new Trackstack.Views.FeedComposite({collection: this.collection, feedType: "All"})
    this.addSubview("#feed", feedView)

    this.addSidebar()
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }))
    this.attachSubviews();
    return this;
  },

  addSidebar: function () {
    var sidebarView = new Trackstack.Views.SidebarComposite({ model: this.model})
    this.addSubview(".sidebar", sidebarView)
  }

});
