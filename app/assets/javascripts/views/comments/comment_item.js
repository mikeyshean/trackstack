Trackstack.Views.CommentItem = Backbone.CompositeView.extend({
  template: JST['comments/comment'],
  tagName: "li",
  initialize: function () {
    // this.listenTo(this.model, "change:img_comment", this.render)
  },

  // events: {
  //   "blur .feed-comment-input"
  // },

  render: function () {
    this.$el.html(this.template({ comment: this.model }))
    setTimeout(function () {
      this.$(".comment-wrapper").addClass("transitioning")
    }.bind(this),0)
    return this;
  }
});
