(function () {
  $.Modals = function (el, options) {
    this.$el = $(el);
    if (options) {
      this.view = options.view
    }
    this.$el.on("click", ".modal-background", this.toggleModal.bind(this));
    this.$el.on("click", ".cancel", this.toggleModal.bind(this));
  };

  $.Modals.prototype.toggleModal = function (e) {
    e.preventDefault();
    
    var $modal = this.$el.find(".upload-modal").removeClass("transitioning")
    var $background = this.$el.find(".modal-background").removeClass("transitioning")

    $background.one("transitionend", function (e) {
      $background.remove();
      this.view && this.view.render()
    }.bind(this))

  };

  $.fn.modal = function (options) {
    return this.each(function () {
      new $.Modals(this, options);
    });
  };

})();

$(function () {
  $("#modal").modal();
});
