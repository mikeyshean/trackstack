Trackstack.Views.UserShow = Backbone.CompositeView.extend({

  template: JST['users/show'],
  modalCoverTemplate: JST['modals/modal_content'],
  modalProfileTemplate: JST['modals/modal_profile_photo'],
  modalBackgroundTemplate: JST['modals/modal_background'],

  events: {
    "click .follow-button": "toggleFollow",
    "click .css-file-input": "openFileBrowser",
    "submit .photo-form": "submit",
    "change .file-input-button": "fileInputChange",
    "click .feed-links": "swapFeedView"
  },

  initialize: function (options) {
    this.totalFeed = options.totalFeed
    this.followers = this.model.followers();
    this.tracks = this.model.tracks();
    this.playlists = this.model.playlists();
    this.followee_id = this.model.id;
    this.tracks.fetch();

    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.followers, "add", this._updateFollowerCount.bind(this, 1));
    this.listenTo(this.followers, "remove", this._updateFollowerCount.bind(this, -1));
    this.listenTo(this.tracks, "add", this._updateTrackCount.bind(this, 1));
    this.listenTo(this.tracks, "remove", this._updateTrackCount.bind(this, -1));

    this.feedTypes = {
      "tracks": this.tracks,
      "playlists": this.playlists,
      "all": this.totalFeed
    };

    this.currentFeedType = options.feedType || "all"
    this.currentFeed = this.feedTypes[this.currentFeedType]
    this.renderMainFeed(this.currentFeedType);
  },

  render: function () {
    this.$el.html(this.template({ user: this.model, currentUser: Trackstack.currentUser }));
    this.$el.append(this.modalProfileTemplate({user: this.model }));
    this.$el.append(this.modalCoverTemplate({user: this.model }));
    this.attachSubviews()
    this.$("#" + this.currentFeedType).addClass("active")
    return this;
  },

  renderMainFeed: function () {
    this.currentFeed.fetch({ reset: true })

    this.feedView = new Trackstack.Views.FeedComposite({ collection: this.currentFeed })
    this.addSubview("#feed", this.feedView)
  },

  swapFeedView: function (e) {
    e.preventDefault();
    var $currentTarget = $(e.currentTarget)
    this.$(".feed-links").removeClass("active")
    $currentTarget.addClass("active")

    this.feedView && this.feedView.remove();
    var newFeedType = $currentTarget.data("feed-type")
    this.updateUrl(newFeedType)
    this.currentFeed = this.feedTypes[newFeedType]
    this.currentFeed.fetch({reset: true});
    this.feedView = new Trackstack.Views.FeedComposite({ collection: this.currentFeed })
    this.addSubview("#feed", this.feedView)

  },

  toggleFollow: function (e) {
    Trackstack.Util.toggleFollow(e, this)
  },

  submit: function(e){
    e.preventDefault();

    var $form = $(e.currentTarget)
    var attribute = $(e.currentTarget).find(".file-input-button").attr("name")
    var file = $form.find(".file-input-button")[0].files[0];

    var formData = new FormData();
    formData.append(attribute, file);

    var that = this;

    this.model.saveFormData(formData, {
      success: function(model, response){
        Trackstack.currentUser.set(response)
        Backbone.history.navigate("#/users/" + that.model.id, { trigger: true });
      }
    });
  },

  fileInputChange: function(e){
    e.preventDefault();

    var formType = $(e.currentTarget).data("form-type")
    var attribute = $(e.currentTarget).attr("name")

    var that = this;
    var file = e.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      that._updatePreview(reader.result, formType + "-preview");
    };

    if (file) {
      reader.readAsDataURL(file);
      this.$el.append(this.modalBackgroundTemplate)

      setTimeout(function () {
        $(".modal-background").addClass("transitioning");
        $(formType).addClass("transitioning");
        this.$el.modal({view: this});
      }.bind(this))
    } else {
      that._updatePreview("");
    }
  },

  openFileBrowser: function (e) {
    e.preventDefault();

    var formType = $(e.currentTarget).data("form-type")

    $(formType).click();
  },

  updateUrl: function (feedType) {
    window.history.pushState(null, null,"#/users/" + this.model.id + "/" + feedType)
  },

  _updateFollowerCount: function (incr) {
    var count = this.$("#follower-count").text()
    this.$("#follower-count").text(+count + incr);
  },

  _updatePreview: function(src, selector){
    this.$el.find(selector).attr("src", src);
  },

  _updateTrackCount: function (incr) {
    var count = this.$("#track-count").text()
    this.$("#track-count").text(+count + incr);
  }

});
