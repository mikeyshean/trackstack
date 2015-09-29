Trackstack.Views.SidebarComposite = Backbone.CompositeView.extend({

  template: JST['sidebar/main'],

  initialize: function (options) {
    this.followables = Trackstack.currentUser.followables();
    this.likes = Trackstack.currentUser.likes();

    this.listenTo(this.followables, "add", this.addFollowableView)
    this.listenTo(this.followables, "remove", this.fetchFollowable)
    this.addFollowableSubviews();
    this.addLikeSubviews();
  },

  render: function () {

    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  addFollowableView: function (followable) {
    var view = new Trackstack.Views.FollowableItem({ model: followable, collection: this.followables })
    this.addSubview(".followable-list", view, true)
    setTimeout(function () {
      view.$el.addClass("transitioning")
    }, 0)
  },

  addFollowableSubviews: function () {
    this.followables.each(function (followable) {
      this.addFollowableView(followable)
    }.bind(this))
  },

  addLikeSubviews: function () {
    this.likes.each(function (like) {
      var view = new Trackstack.Views.LikeItem({ model: like })
      this.addSubview(".likes-list", view)
      setTimeout(function () {
        view.$el.addClass("transitioning")
      }, 0)
    }.bind(this))
  },

  fetchFollowable: function (model) {
    this.removeModelSubview(".followable-list", model);
    this.followables.fetch();
  }
});
