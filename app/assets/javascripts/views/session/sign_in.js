Trackstack.Views.SignIn = Backbone.View.extend({

  initialize: function(options){
    this.callback = options.callback;
    this.listenTo(Trackstack.currentUser, "signIn", this.signInCallback);
  },

  events: {
    "submit #signin-form": "submit",
    "submit #new-user-form": "create",
    "click #demo": "signInDemo"
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

  create: function(event){
    event.preventDefault();
    var $form = $(event.currentTarget);
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
    Trackstack.currentUser.signIn({
      username: "BeliEBEr",
      password: "password",
      error: function(){
        alert("Invalid username or password combination.");
      }
    });
  }

});
