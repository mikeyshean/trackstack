Trackstack.Views.FeedComposite = Backbone.CompositeView.extend({

  template: JST['feeds/user_feed'],
  loadingGif: function () { return $("<div></div>").addClass("loading-gif") },

  initialize: function (options) {
    this.listenTo(this.collection, "add", this.addSoundSubview)
    this.listenTo(this.collection, "reset", this.addSoundSubviews)
    this.listenTo(this.collection, "playing", this.pausePlayers)

    this.attachInfiniteScroll();
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  addSoundSubviews: function () {
    this.collection.each(function (sound) {
      this.addSoundSubview(sound)
    }.bind(this))
  },

  addSoundSubview: function (model) {
    if (!this.isEmptyPlaylist(model)) {
      var view = new Trackstack.Views.UserFeedItem({model: model})
      this.addSubview(".feed-items", view);
    }
  },

  isEmptyPlaylist: function(model) {
    return model instanceof Trackstack.Models.Playlist &&
      model.playlistTracks().length === 0
  },

  pausePlayers: function () {
    this.eachSubview(function (subview, selector) {
      subview.waveSurfer.pause();
    })
  },

  attachInfiniteScroll: function () {
    var $feed = this.$el
    var that = this;
    $(window).scroll(function () {
      if ($(window).scrollTop() + $(window).height() == $(document).height() && !that.loading) {
        that.loading = true
        that.$el.append(that.loadingGif())
        that.collection.fetch({
          success: function () {
            that.$(".loading-gif").remove();
            that.loading = false;
          }
        });
      }
    })
  },

});
