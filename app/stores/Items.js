var Reflux = require('reflux');
var Actions = require('../actions');
var firebase = require('../util/firebase');


var Items = Reflux.createStore({
  init: function () {
    Actions.addItem.listen(this.addItem);
    this.firebase = firebase.child('items');
    this.firebase.on('value', this.updateItems);
  },

  // teardown: function () {
  //   this.firebase.off('child_added', this.handleItemAdded);
  //   this.firebase.off('child_removed', this.handleItemRemoved);
  // },

  addItem: function (listKey, item) {
    this.firebase.child(listKey).push(item);
  },

  updateItems: function (snapshot) {
    var items = [];
    var value = snapshot.val();
    Object.keys(value).forEach(function (listKey) {
      Object.keys(value[listKey]).forEach(function (key) {
        items.push({
          listKey: listKey,
          key: key,
          value: value[listKey][key]
        });
      });
    });

    this.items = items;
    this.trigger(this.items);
  }
});


module.exports = Items;
