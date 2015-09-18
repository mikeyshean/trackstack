Trackstack.Views.UserShow = Backbone.CompositeView.extend({

  template: JST['users/show'],
  modalCoverTemplate: JST['modals/modal_content'],
  modalProfileTemplate: JST['modals/modal_profile_photo'],
  modalBackgroundTemplate: JST['modals/modal_background'],

  events: {
    "click .follow-button": "toggleFollowState",
    "click .css-file-input": "openFileBrowser",
    "submit form": "submit",
    "change .file-input-button": "fileInputChange",
    "click .feed-links": "swapFeedView"
  },

  initialize: function (options) {
    this.feed = options.feed
    this.followers = this.model.followers();
    this.tracks = this.model.tracks();
    this.playlists = this.model.playlists();

    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.followers, "sync remove", this.render);
    this.listenTo(this.tracks, "reset", this.render);

    this.feedView = new Trackstack.Views.FeedComposite({collection: this.feed})
    this.addSubview("#feed", this.feedView)

    this.feedTypes = {
      "Tracks": this.tracks,
      "Playlists": this.playlists
    }
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    this.$el.append(this.modalProfileTemplate({user: this.model }));
    this.$el.append(this.modalCoverTemplate({user: this.model }));
    this.attachSubviews()
    console.log("show")
    return this;
  },

  swapFeedView: function (e) {
    e.preventDefault();
    alert()
    this.feedView && this.feedView.remove();
    var newFeedType = $(e.currentTarget).data("feed-type")
    this.feedView = new Trackstack.Views.FeedComposite({ collection: this.feedTypes[newFeedType] })
    this.addSubview("#feed", this.feedView)
  },

  // addFeedSubview: function (model) {
  //   var view = new Trackstack.Views.FeedComposite({collection: this.feed})
  //   this.addSubview("#feed", view);
  // },

  toggleFollowState: function (e) {
    var $followButton = $(e.currentTarget)
    $followButton.attr("disabled", true)
    var beforeState = $followButton.data("follow-state")

    this.model.set({ followed: !beforeState })
    $followButton.attr("data-follow-state", !beforeState)

    if (beforeState === true) {
      var current_user = this.followers.findWhere({ current_user: true })

      current_user.destroy({
        success: function () {
          $followButton.removeAttr("disabled");
        },
        error: function () {
          this.model.set({ followed: beforeState })
        }.bind(this)
      })
    } else {
      this.followers.create({}, {
        success: function () {
          $followButton.removeAttr("disabled");
        },
        error: function (model) {
          this.model.set({ followed: beforeState })
        }.bind(this)
      })
    }
  },

  submit: function(e){
    event.preventDefault();

    var $form = $(e.currentTarget)
    var attribute = $(e.currentTarget).find(".file-input-button").attr("name")
    var file = $form.find(".file-input-button")[0].files[0];

    var formData = new FormData();
    formData.append(attribute, file);

    var that = this;
    this.model.saveFormData(formData, {
      success: function(){
        Backbone.history.navigate("#/users/" + that.model.id, { trigger: true });
      }
    });
  },

  fileInputChange: function(e){
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

  _updatePreview: function(src, selector){
    this.$el.find(selector).attr("src", src);
  }


});
