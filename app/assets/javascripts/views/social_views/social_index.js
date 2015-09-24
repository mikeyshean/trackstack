Trackstack.Views.SocialIndex = Backbone.CompositeView.extend({

  template: JST['social/index'],

  initialize: function (options) {
    this.collectionType = options.type
    this.addSocialSubviews();
  },


  addSocialSubviews: function () {
    this.collection.each(function (model) {
      var view = new Trackstack.Views.SocialItem({ model: model })
      this.addSubview("#social-list", view)
    }.bind(this))
  },

  render: function () {
    this.$el.html(this.template({ user: this.model, type: this.collectionType }));
    this.attachSubviews();
    return this;
  }

});
