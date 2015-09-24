Trackstack.Views.CommentItem = Backbone.CompositeView.extend({
  template: JST['comments/comment'],
  tagName: "li",

  render: function () {
    this.$el.html(this.template({ comment: this.model }))
    setTimeout(function () {
      this.$(".comment-wrapper").addClass("transitioning")
    }.bind(this),0)
    return this;
  }
});
