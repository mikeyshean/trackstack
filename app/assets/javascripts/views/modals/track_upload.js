Trackstack.Views.TrackUpload = Backbone.View.extend({

  template: JST['modals/track_upload_modal'],
  events: {
    "click .css-file-input": "openFileBrowser",
    "submit form": "submit",
    "change .file-input-button": "fileInputChange"
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

    var formData = new FormData();
    formData.append(attribute, file);

    var that = this;
    this.model.saveFormData(formData, {
      success: function(){
        Backbone.history.navigate("#/tracks/" + that.model.id, { trigger: true });
      },
      error: function (model, response) {
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

  openFileBrowser: function (e) {
    e.preventDefault();
    this.$("#track-file-input-button").click();
  },

  _updatePreview: function(src, selector){
    this.$el.find(selector).attr("src", src);
  }


});
