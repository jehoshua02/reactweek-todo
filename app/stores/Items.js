var Reflux = require('reflux');
var Actions = require('../actions');
var firebase = require('../util/firebase').child('items');

var items = [];

var updateItems = function (snapshot) {
  items = [];
  var value = snapshot.val();
  if (!value) { return; }
  Object.keys(value).forEach(function (key) {
    var item = value[key];
    item.key = key;
    items.push(item);
  });
};

var addItem = function (item) {
  firebase.push(item);
};

var removeItem = function (key) {
  firebase.child(key).remove();
};

var Items = Reflux.createStore({
  init: function () {
    Actions.item.add.listen(addItem);
    Actions.item.remove.listen(removeItem);

    firebase.on('value', function (snapshot) {
      updateItems(snapshot);
      this.trigger();
    }.bind(this));
  },

  getItems: function (listKey) {
    return items.filter(function (item) {
      return item.listKey === listKey;
    });
  }
});


module.exports = Items;
