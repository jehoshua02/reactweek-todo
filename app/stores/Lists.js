var Reflux = require('reflux');
var Actions = require('../actions');
var firebase = require('../util/firebase').child('lists');

var lists = [];

var update = function (snapshot) {
  var value = snapshot.val();
  if (!value) { return; }
  lists = Object.keys(value).map(function (key) {
    var list = value[key];
    list.key = key;
    return list;
  });
};

var addList = function (list) {
  firebase.push(list);
};

var removeList = function (key) {
  firebase.parent().child('items').orderByChild('listKey').equalTo(key).remove();
  firebase.child(key).remove();
};

var Lists = Reflux.createStore({
  init: function () {
    Actions.list.add.listen(addList);
    Actions.list.remove.listen(removeList);

    firebase.on('value', function (snapshot) {
      update(snapshot);
      this.trigger();
    }.bind(this));
  },

  getLists: function () {
    return lists;
  }
});

module.exports = Lists;
