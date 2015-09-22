Trackstack.Views.TrackShow = Backbone.CompositeView.extend({
  template: JST['tracks/show'],

  initialize: function () {
    this.comments = this.model.comments()
    this.listenTo(this.model, "sync", this.render)
    this.listenTo(this.comments, "add", this.addCommentSubview)
    this.listenTo(this.comments, "reset", this.addCommentSubviews)
  },

  addCommentSubview: function (comment) {
    var view = new Trackstack.Views.CommentItem({ model: comment })
    this.addSubview("#comments", view)
  },


  addCommentSubviews: function (comments) {
    comments.each(function (comment) {
      var view = new Trackstack.Views.CommentItem({ model: comment })
      this.addSubview("#comments", view)
    })
  },


  render: function () {
    this.$el.html(this.template({ track: this.model }))
    this.attachSubviews();
    return this;
  }
});
