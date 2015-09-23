(function () {
  $.Tabs = function (el) {
    this.$el = $(el);
    this.$tabContents = $(this.$el.data("tab-content"));
    this.$activeTab = this.$tabContents.find(".active");

    this.$el.on("click", "a", this.clickTab.bind(this));
  };

  $.Tabs.prototype.clickTab = function (e) {
    e.preventDefault();

    this.$el.find("a").removeClass("active").addClass("disabled")


    var $newActiveLink = $(e.currentTarget);
    $newActiveLink.removeClass("disabled").addClass("active");
    $newActiveTab = this.$tabContents.find($newActiveLink.attr("href"))

    this.$activeTab.removeClass("active");
    $newActiveTab.addClass("active");
    this.$activeTab = $newActiveTab
    $(".form-field").first().focus();
  };

  $.fn.tabs = function () {
    return this.each(function () {
      new $.Tabs(this);
    });
  };

})();
