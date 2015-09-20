Trackstack.Views.TrackUpload = Backbone.View.extend({

  template: JST['modals/track_upload_modal'],
  events: {
    "click .track-file-button": "openTrackBrowser",
    "click .track-photo-button": "openPhotoBrowser",
    "submit #track-file-form": "submit",
    "submit #track-details-form": "updateTrack",
    "change #track-file-input-button": "swapForm",
    "change #track-photo-input-button": "fileInputChange"
  },

  initialize: function (options) {
  },

  render: function () {
    this.$el.html(this.template({ track: this.model }));
    return this;
  },


  submit: function(e){
    event.preventDefault();

    var $form = $(e.currentTarget)
    var attribute = $(e.currentTarget).find(".file-input-button").attr("name")
    var file = $form.find(".file-input-button")[0].files[0];

    var title = this.$("#track_title").val();
    var desc = this.$("#track_description").val();

    var formData = new FormData();
    formData.append(attribute, file);

    var that = this;
    this.model.saveFormData(formData, {
      success: function(model, response, options){
        $("#save-details-button").show().attr("data-id", model.id);
        $("#loading-gif").remove();
      },
      error: function (model, response, options) {
        alert(response.responseJSON[0])
        $(".modal-background").click();
      }
    });
  },

  fileInputChange: function(e){
    e.preventDefault()
    var that = this;
    var file = e.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      that._updatePreview(reader.result, "#track-photo-preview");
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      that._updatePreview("");
    }
  },

  swapForm: function(e){
    var file = e.currentTarget.files[0];

    if (file) {
      this.$("#track-file-form").submit();
      this.$("#form-one").hide();
      this.$("#form-two").show();
    }

  },

  updateTrack: function (e) {
    e.preventDefault();

    var formData = $(e.currentTarget).serializeJSON()
    var trackId = $(e.currentTarget).attr("data-id")

    formData.append("track[id]", trackId)
    var track = new Trackstack.Models.Track()
    track.save(formData.track, {
      success: function (model) {
        Backbone.history.navigate("#/tracks/" + model.id)
      },
      error: function () {
        debugger
        alert("Looks like something went wrong.  Please try again.")
      }
    })
  },

  openTrackBrowser: function (e) {
    e.preventDefault();
    this.$("#track-file-input-button").click();
  },

  openPhotoBrowser: function (e) {
    e.preventDefault();
    this.$("#track-photo-input-button").click();
  },

  _updatePreview: function(src, selector){
    this.$el.find(selector).attr("src", src);
  }


});
