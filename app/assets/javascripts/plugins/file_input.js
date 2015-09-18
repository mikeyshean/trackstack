// (function () {
//   $.FileInput = function (el) {
//     this.$el = $(el);
//
//     this.$el.on("click", "#css-file-input", this.showUploadModal.bind(this));
//   };
//
//   $.FileInput.prototype.showUploadModal = function (e) {
//     e.preventDefault();
//     $(e.currentTarget).find("#file-input-button").click();
//   };
//
//   $.fn.fileinput = function () {
//     return this.each(function () {
//       new $.FileInput(this);
//     });
//   };
//
// })();
//
// $(function () {
//   $(".file-input-plugin").fileinput();
// });
