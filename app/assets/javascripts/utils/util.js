Trackstack.Util = {

  toggleLike: function (e, view) {
    e.preventDefault();
    var $button = $(e.currentTarget)
    $button.attr("disabled", true)
    $button.toggleClass("button-orange-border").addClass("disabled")

    var beforeState = $button.attr("data-like-state")
    if (beforeState === "true") {
      $button.attr("data-like-state", "false");
      this.destroyLike.call(view, $button);
    } else {
      $button.attr("data-like-state", "true");
      this.createLike.call(view, $button);
    }
  },

  destroyLike: function (button) {
    var liker = this.likers.findWhere({ id: Trackstack.currentUser.id })

    liker.destroy({
      success: function (model) {
        button.removeAttr("disabled");
        Trackstack.currentUser.likes().remove(this.sound)
      }.bind(this)
    })
  },

  createLike: function (button) {
    this.likers.create({sound_type: this.sound_type, sound_id: this.sound.id}, {
      success: function (model) {
        this.likers.trigger("notify");
        button.removeAttr("disabled");
        Trackstack.currentUser.likes().add(this.sound)
      }.bind(this)
    })
  },

  toggleFollow: function (e, view) {
    e.preventDefault()
    var $followButton = $(e.currentTarget)
    $followButton.attr("disabled", true)
    var beforeState = $followButton.attr("data-follow-state")
    $followButton.toggleClass("button-orange-border")

    if (beforeState === "true") {
      $followButton.attr("data-follow-state", "false")
      this.stopFollowing.call(view, $followButton);
    } else {
      $followButton.attr("data-follow-state", "true")
      this.startFollowing.call(view, $followButton);
    }
  },

  stopFollowing: function (button) {
    var follower = this.followers.findWhere({ id: Trackstack.currentUser.id })
    follower.destroy({
      success: function (model) {
        button.removeAttr("disabled");
      }
    })
  },

  startFollowing: function (button) {
    this.followers.create({followee_id: this.followee_id }, {
      success: function (model) {
        
        button.removeAttr("disabled");
        Trackstack.currentUser.followables().remove(model)
      }.bind(this),
      wait: true
    })
  },

}
