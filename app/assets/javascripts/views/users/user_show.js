Trackstack.Views.UserShow = Backbone.CompositeView.extend({

  template: JST['users/show'],

  events: {
    "click .follow-button": "toggleFollowState"
  },

  initialize: function (options) {
    this.feed = options.feed
    this.followers = this.model.followers();
    this.tracks = this.model.tracks();

    // this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.followers, "sync remove", this.render);
    this.listenTo(this.feed, "add", this.addFeedSubview);
    this.listenTo(this.tracks, "reset", this.render);
  },

  render: function () {
    console.log("show")
    this.$el.html(this.template({ user: this.model }));
    this.attachSubviews()
    return this;
  },

  addFeedSubview: function (model) {
    var view = new Trackstack.Views.UserFeed({model: model})
    this.addSubview("#feed", view);
  },

  toggleFollowState: function (e) {
    var $followButton = $(e.currentTarget)
    $followButton.attr("disabled", true)
    var beforeState = $followButton.data("follow-state")

    this.model.set({ followed: !beforeState })
    $followButton.attr("data-follow-state", !beforeState)

    if (beforeState === true) {
      var current_user = this.followers.findWhere({ current_user: true })

      current_user.destroy({
        success: function () {
          $followButton.removeAttr("disabled");
        },
        error: function () {
          this.model.set({ followed: beforeState })
        }.bind(this)
      })
    } else {
      this.followers.create({}, {
        success: function () {
          $followButton.removeAttr("disabled");
        },
        error: function (model) {
          this.model.set({ followed: beforeState })
        }.bind(this)
      })

    }
  }
});
