var Reflux = require('reflux');

var Actions = Reflux.createActions({
  item: { children: ['add', 'remove'] },
  list: { children: ['add', 'remove'] }
});

module.exports = Actions;
