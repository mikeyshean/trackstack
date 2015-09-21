Trackstack.Models.Comment = Backbone.Model.extend({
  urlRoot: function () {
    this.collection.url();
  },

  toJSON: function (payload) {
    return { "comment": _.clone(this.attributes) }
  }
});
