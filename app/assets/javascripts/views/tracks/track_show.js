Trackstack.Views.TrackShow = Backbone.CompositeView.extend({
  template: JST['tracks/show'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)

    this.attachCommentsComposite()
  },

  attachCommentsComposite: function () {
    var collection = this.model.comments()
    var view = new Trackstack.Views.CommentComposite({ collection: collection })

    this.addSubview("#comments", view)
  },


  render: function () {
    this.$el.html(this.template({ track: this.model }))
    this.attachSubviews();
    return this;
  }
});
