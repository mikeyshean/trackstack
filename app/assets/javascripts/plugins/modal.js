(function () {
  $.Modals = function (el) {
    this.$el = $(el);

    this.$el.on("click", ".modal-background", this.toggleModal.bind(this));
  };

  $.Modals.prototype.toggleModal = function (e) {
    var $modal = this.$el.find(".upload-modal").removeClass("transitioning")
    var $background = this.$el.find(".modal-background").removeClass("transitioning")

    $modal.one("transitionend", function () {
      $(e.currentTarget).remove();
    })

  };

  $.fn.modal = function () {
    return this.each(function () {
      new $.Modals(this);
    });
  };

})();

$(function () {
  $("#modal").modal();
});
