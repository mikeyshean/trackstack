Trackstack.Views.TrackShow = Backbone.View.extend({
  template: JST['tracks/show'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function () {
    this.$el.html(this.template({ track: this.model }))
    return this;
  }
});
