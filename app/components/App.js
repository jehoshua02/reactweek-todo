var React = require('react');
var ListContainer = require('./ListContainer');
var AddList = require('./AddList');
var Actions = require('../actions');
var Store = require('../stores/Lists');

var App = React.createClass({

  getInitialState: function () {
    return {
      lists: Store.getLists()
    };
  },

  render: function() {
    var lists = this.state.lists.map(function (list) {
      return (
        <ListContainer
          key={list.key}
          data={list}
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
    this.unsubStore = Store.listen(function () {
      this.setState({ lists: Store.getLists() });
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.unsubStore();
  },

  handleAddList: function (list) {
    Actions.list.add(list);
  },

  handleRemoveList: function (key) {
    Actions.list.remove(key);
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
