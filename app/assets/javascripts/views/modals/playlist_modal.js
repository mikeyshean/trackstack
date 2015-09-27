Trackstack.Views.PlaylistModal = Backbone.CompositeView.extend({

  template: JST['modals/playlist'],

  events: {
    "submit #new-playlist-form": "submit",
  },

  initialize: function (options) {
    this.collection = Trackstack.currentUser.playlists()
    this.collection.fetch({reset: true})
    this.listenTo(this.collection, "add", this.addPlaylistSubview)
    this.listenTo(this.collection, "reset", this.addPlaylistSubviews)
    this.listenTo(this.collection, "notify", this.showNotification);
  },

  addPlaylistSubviews: function () {
    this.collection.each(function (playlist) {
      this.addPlaylistSubview(playlist);
    }.bind(this))
  },

  addPlaylistSubview: function (playlist) {
    var view = new Trackstack.Views.PlaylistModalItem({ playlist: playlist, track: this.model })
    this.addSubview("#my-playlists", view, true)
  },

  render: function () {
    this.$el.html(this.template({ track: this.model }));
    this.attachSubviews();
    return this;
  },

  submit: function (e) {
    e.preventDefault();
    var currentTarget = $(e.currentTarget)
    var formData = currentTarget.serializeJSON();
    formData.playlist["track_id"] = String(this.model.id)

    this.collection.create(formData.playlist, {
      success: function (model, response) {
        if (model.playlistTracks().length) {
          this.collection.trigger("notify");
        }
        currentTarget.find("input").val("");
        this.$("#new-playlist-tab").click();
      }.bind(this),
      error: function (model, response) {

      },
      wait: true
    });

  },

  showNotification: function (playlist) {
    var notify = $("#notification")
    var track = this.collection.last().playlistTracks().first();
    var playlistTitle = this.collection.last().escape("title")
    var view = new Trackstack.Views.Notify({
      sound: track,
      badgeImg: track.escape("badge_img"),
      type: "Playlist",
      playlistTitle: playlistTitle
    })

    notify.append(view.render().$el)
    var alert = view.$(".sound-notification")
    setTimeout(function () {
      alert.addClass("active")
      setTimeout(function () {
        alert.removeClass("active")
        alert.on("transitionend",function () {
          view.remove()
        })
      }, 10000)
     }, 0)
   },
})
