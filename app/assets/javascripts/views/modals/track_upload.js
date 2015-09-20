Trackstack.Views.TrackUpload = Backbone.View.extend({

  template: JST['modals/track_upload_modal'],
  events: {
    "click .css-file-input": "openFileBrowser",
    "submit form": "submit",
    "change #track-file-input-button": "swapForm"
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
    // formData.append("track[title]", title);
    // formData.append("track[description]", desc);

    var that = this;
    this.model.saveFormData(formData, {
      success: function(){
        // Backbone.history.navigate("#/tracks/" + that.model.id, { trigger: true });
        // notify completion
      },
      error: function (model, response) {
        alert(response.responseJSON[0])
      }
    });
  },

  fileInputChange: function(e){
    var that = this;
    var file = e.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      that._updatePreview(reader.result);
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

  openFileBrowser: function (e) {
    e.preventDefault();
    this.$("#track-file-input-button").click();

  },

  _updatePreview: function(src, selector){
    this.$el.find(selector).attr("src", src);
  }


});
