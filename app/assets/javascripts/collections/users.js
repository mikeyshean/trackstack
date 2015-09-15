
// Temp collection

Trackstack.Collections.Users = Backbone.Collection.extend({
  url: "api/users/",
  model: Trackstack.Models.User,

  getOrFetch: function (id) {
    var user = this.get(id);
    var collection = this

    if (user) {
      user.fetch()
    } else {
      user = new collection.model({id: id})
      collection.add(user)
      user.fetch({
        error: function (model) {
          collection.remove(model)
        }
      })
    }
    return user;
  }
});
