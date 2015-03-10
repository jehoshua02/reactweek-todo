var React = require('react');
var ListContainer = require('./ListContainer');
var AddList = require('./AddList');

var App = React.createClass({
  getInitialState: function () {
    return {
      lists: []
    };
  },

  render: function() {
    var lists = this.state.lists.map(function (list) {
      return (
        <ListContainer title={list.title} key={list.index} index={list.index} color={list.color} onRemove={this.handleRemoveList} />
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

  handleAddList: function (list) {
    list.index = this.state.lists.length;
    this.setState({
      lists: this.state.lists.concat(list)
    });
  },

  handleRemoveList: function (index) {
    console.log(index);
    this.setState({
      lists: this.state.lists.filter(function (list) { return list.index !== index; })
    });
  }

});

React.render(
  <App />,
  document.getElementById('app')
);
