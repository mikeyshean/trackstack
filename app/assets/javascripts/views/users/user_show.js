Trackstack.Views.UserShow = Backbone.View.extend({

  template: JST['users/show'],

  events: {
    "click .follow-button": "toggleFollowState"
  },

  initialize: function () {
    this.followers = this.model.followers();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.followers, "sync remove", this.render)
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    return this;
  },

  toggleFollowState: function (e) {
    var $currentTarget = $(e.currentTarget)
    $currentTarget.attr("disabled", true)
    var beforeState = $currentTarget.data("follow-state")

    this.model.set({ followed: !beforeState })
    $currentTarget.attr("data-follow-state", !beforeState)

    if (beforeState === true) {
      var current_user = this.followers.findWhere({ current_user: true })
      current_user.destroy({
        success: function () {
          $currentTarget.removeAttr("disabled");
        },
        error: function () {
          this.model.set({ followed: beforeState })
        }.bind(this)
      })
    } else {
      this.followers.create({}, {
        success: function () {
          $currentTarget.removeAttr("disabled");
        },
        error: function (model) {
          this.model.set({ followed: beforeState })
        }.bind(this)
      })

    }
  }

});
