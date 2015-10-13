Trackstack.Util = {
  toggleLike: function (e) {
    e.preventDefault();
    var $button = $(e.currentTarget)
    $button.attr("disabled", true)
    $button.toggleClass("button-orange-border").addClass("disabled")

    var beforeState = $button.attr("data-like-state")
    if (beforeState === "true") {
      $button.attr("data-like-state", "false");
      Trackstack.Util.destroyLike.call(this, $button);
    } else {
      $button.attr("data-like-state", "true");
      Trackstack.Util.createLike.call(this, $button);
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

}
