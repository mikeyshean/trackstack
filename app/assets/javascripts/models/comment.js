Trackstack.Models.Comment = Backbone.Model.extend({
  urlRoot: function () {
    this.collection.url();
  },

  toJSON: function (payload) {
    return { "comment": _.clone(this.attributes) }
  },

  convertedTime: function () {
    var s = this.get("submitted_at");

    var hours = Math.floor(s / 3600)
    s -= hours * 3600

    var minutes = Math.floor(s / 60)
    s -= minutes * 60

    s = Math.floor(s)

    if (hours >= 1) {
      return this._padded(hours) + ":" + this._padded(minutes) + ":" + this._padded(s)
    } else {
      return this._padded(minutes) + ":" + this._padded(s)
    }
  },

  _padded: function(num) {
    if (num >= 1) {
      return num;
    } else {
      return "0" + num
    }
  }
});
