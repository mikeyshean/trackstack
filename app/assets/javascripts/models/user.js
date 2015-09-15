Trackstack.Models.User = Backbone.Model.extend({
  urlRoot: "api/users",


  parse: function (response) {
    if (response.followers) {
      this.followers().set(response.followers);
      delete response.followers;
    }

    return response;
  },

  followers: function () {
    if (!this._followers) {
      this._followers = new Trackstack.Collections.Followers([], { user_id: this.id })
    }

    return this._followers
  }
});
