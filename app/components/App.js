var React = require('react');
var ListContainer = require('./ListContainer');
var AddList = require('./AddList');
var Firebase = require('firebase');


var App = React.createClass({
  getInitialState: function () {
    return {
      lists: []
    };
  },

  render: function() {
    var lists = this.state.lists.map(function (list) {
      return (
        <ListContainer
          key={list.key}
          data={list}
          firebaseUrl={this.firebase.root.child('items/' + list.key).toString()}
          onRemove={this.handleRemoveList.bind(null, list.key)}
        />
      );
    }.bind(this));

    return (
      <div className="container">
        <div className="row">
          <AddList onAdd={this.handleAddList} />
          {lists}
        </div>
      </div>
    )
  },

  componentDidMount: function () {
    this.firebase = { root: new Firebase('https://jehoshua02-reactweek-todo.firebaseio.com') };
    this.firebase.lists = this.firebase.root.child('lists');
    this.firebase.items = this.firebase.root.child('items');

    // bind events
    this.firebase.lists.on('child_added', this.handleListAdded);
    this.firebase.lists.on('child_removed', this.handleListRemoved);
  },

  componentWillUnmount: function () {
    this.firebase.lists.off('child_added', this.handleListAdded);
  },

  handleAddList: function (list) {
    this.firebase.lists.push(list);
  },

  handleRemoveList: function (key) {
    this.firebase.lists.child(key).remove();
    this.firebase.items.child(key).remove();
  },

  handleListAdded: function (snapshot) {
    var list = snapshot.val();
    list.key = snapshot.key();
    this.setState({
      lists: this.state.lists.concat(list)
    });
  },

  handleListRemoved: function (snapshot) {
    var key = snapshot.key();
    this.setState({
      lists: this.state.lists.filter(function (list) { return list.key !== key; })
    });
  }

});

module.exports = App;
