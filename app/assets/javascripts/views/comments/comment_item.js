Trackstack.Views.CommentItem = Backbone.CompositeView.extend({
  template: JST['comments/comment'],
  tagName: "li",
  initialize: function () {
    this.listenTo(this.model, "change:img_comment", this.render)
  },

  render: function () {
    this.$el.html(this.template({ comment: this.model }))
    return this;
  }
});
