Trackstack.Views.FollowableItem = Backbone.View.extend({

  template: JST['sidebar/followable_item'],
  tagName: "li",
  className: "sidebar-item group",

  initialize: function (options) {

  },

  events: {
    "click .follow-button": "toggleFollow"
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    return this;
  },

  toggleFollow: function (e) {
    e.preventDefault()
    var $followButton = $(e.currentTarget)
    var that = this
    $followButton.attr("disabled", true)
    $followButton.toggleClass("button-orange-border")

    $followButton.attr("data-follow-state", "true")
    this.model.followers().create({followee_id: this.model.id }, {
      success: function (model) {
        $followButton.removeAttr("disabled");
        setTimeout(function () {
          that.$el.addClass("fadeout")
          that.$el.on("transitionend", function() {
            that.collection.remove(that.model)
          });
        }, 500)
      },
      wait: true,
      error: function (model, response) {
        debugger
      }.bind(this)
    })

  }

});
