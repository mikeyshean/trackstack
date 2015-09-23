Trackstack.Views.CommentComposite = Backbone.CompositeView.extend({
  template: JST['comments/comment_composite'],

  initialize: function (options) {

    this.listenTo(this.collection, "add", this.addCommentSubview)
    this.listenTo(this.collection, "remove", this.removeCommentSubview)
    this.listenTo(this.collection, "reset", this.addCommentSubviews)

    this.addCommentSubviews(this.collection)
  },

  render: function () {
    this.$el.html(this.template())
    this.attachSubviews();
    return this;
  },

  addCommentSubview: function (model) {
    var view = new Trackstack.Views.CommentItem({ model: model })
    this.addSubview("#comments-list", view, true)
  },

  removeCommentSubview: function (model) {
    this.removeModelSubview("#comments-list", model)
  },


  addCommentSubviews: function (comments) {
    comments.each(function (comment) {
      var view = new Trackstack.Views.CommentItem({ model: comment })
      this.addSubview("#comments-list", view, true)
    }.bind(this))
  },


});
