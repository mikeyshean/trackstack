Trackstack.Models.User = Backbone.Model.extend({
  urlRoot: "api/users",

  parse: function (response) {
    if (response.followers) {
      this.followers().set(response.followers);
      delete response.followers;
    }

    if (response.followees) {
      this.followees().set(response.followees);
      delete response.followees;
    }

    if (response.tracks) {
      this.tracks().set(response.tracks);
      delete response.tracks;
    }

    if (response.playlists) {
      this.playlists().set(response.playlists);
      delete response.playlists;
    }

    if (response.likes) {
      this.likes().set(response.likes);
      delete response.likes;
    }

    if (response.followables) {
      this.followables().set(response.followables);
      delete response.followables;
    }

    return response;
  },

  toJSON: function () {
    var json = {user: _.clone(this.attributes)};
    return json;
  },

  followers: function () {
    if (!this._followers) {
      this._followers = new Trackstack.Collections.Followers([], { user_id: this.id })
    }

    return this._followers
  },

  followees: function () {
    if (!this._followees) {
      this._followees = new Trackstack.Collections.Followees([], { user_id: this.id })
    }

    return this._followees
  },

  tracks: function () {
    if (!this._tracks) {
      this._tracks = new Trackstack.Collections.Tracks([], { user_id: this.id })
    }

    return this._tracks
  },

  playlists: function () {
    if (!this._playlists) {
      this._playlists = new Trackstack.Collections.Playlists([], { user_id: this.id })
    }

    return this._playlists
  },

  likes: function () {
    if (!this._likes) {
      this._likes = new Trackstack.Collections.Likes([], { user_id: this.id })
    }

    return this._likes
  },

  saveFormData: function(formData, options){
    var method = this.isNew() ? "POST" : "PUT";
    var model = this;

    $.ajax({
      url: _.result(model, "url"),
      type: method,
      data: formData,
      processData: false,
      contentType: false,
      success: function(resp){
        model.set(model.parse(resp));
        model.trigger('sync', model, resp, options);
        options.success && options.success(model, resp, options);
      },
      error: function(resp){
        options.error && options.error(model, resp, options);
      }
    });
  },

  create: function(options){
    var model = this;
    var credentials = {
      "user[username]": options.username,
      "user[password]": options.password
    };

    $.ajax({
      url: "/users",
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function(data){
        model.set(data);
        options.success && options.success();
      },
      error: function(){
        options.error && options.error();
      }
    });
  }

});


Trackstack.Models.CurrentUser = Trackstack.Models.User.extend({

  url: "/api/session",

  initialize: function(options){
    this.listenTo(this, "change", this.fireSessionEvent);
  },

  isSignedIn: function() {
    return !this.isNew();
  },

  signIn: function(options){
    var model = this;
    var credentials = {
      "user[username]": options.username,
      "user[password]": options.password
    };

    $.ajax({
      url: this.url,
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function(data){
        model.set(data);
        options.success && options.success();
      },
      error: function(){
        options.error && options.error();
      }
    });
  },

  signOut: function(options){
    var model = this;

    $.ajax({
      url: this.url,
      type: "DELETE",
      dataType: "json",
      success: function(data){
        model.clear();
        options.success && options.success();
      }
    });
  },

  fireSessionEvent: function(){
    if(this.isSignedIn()){
      this.trigger("signIn");
    } else {
      this.trigger("signOut");
    }
  },

  followables: function () {
    if (!this._followables) {
      this._followables = new Trackstack.Collections.Followables()
    }

    return this._followables
  },

});
