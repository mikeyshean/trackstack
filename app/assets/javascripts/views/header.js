Trackstack.Views.Header = Backbone.View.extend({
  template: JST["shared/header"],
  dropdownTemplate: JST['nav_dropdown'],
  uploadTemplate: JST['modals/track_upload_modal'],

  initialize: function (options) {
    this.listenTo(Trackstack.currentUser, "signIn signOut", this.render)
    this.render();
    this.$modalEl = options.$modalEl;
    this.$navBarDropdown = this.$("#user-nav-dropdown");
  },

  events: {
    "click #upload": "uploadModal",
    "click #username": "showDropdown",
    "click #sign-out-link": "signOut"
  },

  render: function () {
    var content = this.template({ currentUser: Trackstack.currentUser})
    this.$el.html(content)
    return this;
  },

  uploadModal: function (e) {
    e.preventDefault();
    var track = new Trackstack.Models.Track()
    var view = new Trackstack.Views.TrackUpload({ model: track })

    this.$modalEl.html(view.render().$el)

    setTimeout(function () {
      $(".modal-background").addClass("transitioning")
      $("#track-upload").addClass("transitioning")
    }.bind(this),0)

  },

  showDropdown: function (e) {
    e.preventDefault();
    // debugger
    var $currentTarget = $(e.currentTarget).addClass("active")
    var $dropdown = this.$(".nav-dropdown-wrapper")

    $dropdown.html(this.dropdownTemplate({ currentUserId: Trackstack.currentUser.id }));
    setTimeout(function () {
      $("body").one("click", function (e) {
        $currentTarget.removeClass("active")
        this.$(".nav-dropdown-wrapper").empty();
      }.bind(this))
    }.bind(this), 0);
  },

  signOut: function(e){
    e.preventDefault();
    Trackstack.currentUser.signOut({
      success: function(){
        Backbone.history.navigate("session/new", { trigger: true });
      }
    });
  }


});
