(function () {
  $.Modals = function (el) {
    this.$el = $(el);

    this.$el.on("click", ".modal-background", this.toggleModal.bind(this));
  };

  $.Modals.prototype.toggleModal = function (e) {

    $(e.currentTarget).remove();

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
