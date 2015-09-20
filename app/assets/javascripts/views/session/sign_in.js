Trackstack.Views.SignIn = Backbone.View.extend({

  initialize: function(options){
    this.callback = options.callback;
    this.listenTo(Trackstack.currentUser, "signIn", this.signInCallback);
  },

  events: {
    "submit #signin-form": "submit"
  },

  template: JST['sign_in'],

  render: function(){
    this.$el.html(this.template());

    return this;
  },

  submit: function(event){
    event.preventDefault();
    var $form = $(event.currentTarget);
    var formData = $form.serializeJSON().user;

    Trackstack.currentUser.signIn({
      username: formData.username,
      password: formData.password,
      error: function(){
        alert("Invalid username or password combination.");
      }
    });
  },

  signInCallback: function(event){
    if(this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("", { trigger: true });
    }
  }

});
