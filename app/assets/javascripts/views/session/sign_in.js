Trackstack.Views.SignIn = Backbone.View.extend({

  initialize: function(options){
    this.callback = options.callback;
    this.listenTo(Trackstack.currentUser, "signIn", this.signInCallback);
  },

  events: {
    "submit #signin-form": "submit",
    "submit #new-user-form": "create",
    "click #demo-signin": "signInDemo"
  },

  template: JST['sign_in'],

  render: function(){
    this.$el.html(this.template());

    return this;
  },

  submit: function(e){
    e.preventDefault();
    var $form = $(e.currentTarget);
    var formData = $form.serializeJSON().user;

    Trackstack.currentUser.signIn({
      username: formData.username,
      password: formData.password,
      error: function(){
        alert("Invalid username or password combination.");
      }
    });
  },

  create: function(e){
    e.preventDefault();
    var $form = $(e.currentTarget);
    var formData = $form.serializeJSON().user;

    Trackstack.currentUser.create({
      username: formData.username,
      password: formData.password,
      error: function(){
        alert("Invalid account details.");
      }
    });
  },

  signInCallback: function(event){
    if(this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("", { trigger: true });
    }
  },

  signInDemo: function (e) {
    var username = "MusicLover123",
        password = "password",
        that = this;

    var i = 0
    var nameInterval = setInterval(function () {
      that.$("#username-signin").val(username.slice(0, i++))
      if (i > username.length) {
        clearInterval(nameInterval)
      }
    }, 90)

    setTimeout(function () {
      var j = 0
      var passwordInterval = setInterval(function () {
        that.$("#password").val(password.slice(0, j++))
        if (j > password.length) {
          clearInterval(passwordInterval)

          setTimeout(function () {
            that.$("#signin-form").submit();
          }, 700)
        }
      }, 100)
    },0)


  }

});
