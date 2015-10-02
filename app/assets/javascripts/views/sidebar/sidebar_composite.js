Trackstack.Views.SidebarComposite = Backbone.CompositeView.extend({

  template: JST['sidebar/sidebar'],

  initialize: function (options) {
    this.followables = Trackstack.currentUser.followables();
    this.likes = Trackstack.currentUser.likes();

    this.listenTo(this.followables, "add", this.addFollowableView)
    this.listenTo(this.followables, "remove", this.fetchFollowable)
    this.listenTo(this.likes, "add", this.updateLikeCount.bind(this, 1))
    this.listenTo(this.likes, "remove", this.updateLikeCount.bind(this, -1))

    this.addFollowableSubviews();
    this.addLikeSubviews();
  },

  render: function () {

    this.$el.html(this.template({ likes: this.likes }));
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
      this.addLikeSubview(like)
    }.bind(this))
  },

  addLikeSubview: function (model) {
    var view = new Trackstack.Views.LikeItem({ model: model })
    this.addSubview(".likes-list", view, true)
    setTimeout(function () {
      view.$el.addClass("transitioning")
    }, 0)
  },

  updateLikeCount: function (incr, model) {
    if (incr === 1) {
      this.addLikeSubview(model)
    } else {
      this.removeModelSubview(".likes-list", model)
    }

    var count = this.$("#user-likes-count").text()
    this.$("#user-likes-count").text(+count + incr);
  },

  fetchFollowable: function (model) {
    this.removeModelSubview(".followable-list", model);
    this.followables.fetch();
  }
});
