Trackstack.Views.SocialIndex = Backbone.CompositeView.extend({

  template: JST['social/index'],

  initialize: function (options) {
    this.collectionType = options.type
    if (this.collectionType === "Likes") {
      this.addSoundSubviews();
    } else {
      this.addUserSubviews();
    }
  },

  addUserSubviews: function () {
    this.collection.each(function (model) {
      var view = new Trackstack.Views.SocialItem({ model: model })
      this.addSubview("#social-list", view)
    }.bind(this))
  },

  addUserSubview: function (model) {

    var view = new Trackstack.Views.SocialItem({ model: model })
    this.addSubview("#social-list", view)

  },

  addSoundSubviews: function () {
    this.collection.each(function (model) {
      this.addSoundSubview(model);
    }.bind(this))
  },

  addSoundSubview: function (model) {
    if (!this.isEmptyPlaylist(model)) {
      var view = new Trackstack.Views.UserFeedItem({ model: model })
      this.addSubview("#feed", view)
    }
  },

  render: function () {
    this.$el.html(this.template({ user: this.model, type: this.collectionType }));
    this.attachSubviews();
    return this;
  },


  isEmptyPlaylist: function(model) {
    return model instanceof Trackstack.Models.Playlist &&
      model.get("tracks").length === 0
  }


});
