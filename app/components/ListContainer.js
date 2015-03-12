var React = require('react');
var AddItem = require('./AddItem');
var List = require('./List');
var Firebase = require('firebase');
var Store = require('../stores/Items');
var Actions = require('../actions');


var ListContainer = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      key: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      color: React.PropTypes.string.isRequired
    }).isRequired
  },

  getInitialState: function(){
    return {
      items: []
    }
  },

  render: function(){
    var styles = require('./ListContainer.styles.js');
    styles.container.backgroundColor = this.props.data.color;

    return (
      <div className="col-sm-6">
        <div className="col-sm-12" style={styles.container}>
          <span
            className="glyphicon glyphicon-remove"
            style={styles.remove}
            onClick={this.props.onRemove.bind(null, this.props.data.key)}
          >
          </span>
          <h3 className="text-center">{this.props.data.title}</h3>
          <AddItem addItem={this.handleAddItem} />
          {this.renderList()}
        </div>
      </div>
    )
  },

  componentDidMount: function () {
    Store.listen(this.updateItems);
  },

  updateItems: function (items) {
    console.log(items);
    items = items.filter(function (item) {
      return item.listKey === this.props.data.key
    }.bind(this));

    this.setState({
      items: items
    });
  },

  renderList: function () {
    var styles = require('./List.styles');

    var listItems = this.state.items.map(function (item) {
      return (
        <li key={item.key} className="list-group-item" style={styles.listGroup}>
          <span
            className="glyphicon glyphicon-remove"
            style={styles.removeItem}
            onClick={this.handleRemoveItem.bind(null, item.key, this.props.data.key)}
          >
          </span>
          <span style={styles.todoItem}>
            {item.value}
          </span>
        </li>
      );
    }.bind(this));

    return (
      <ul style={styles.uList}>
        {listItems}
      </ul>
    );
  },

  handleAddItem: function(item) {
    Actions.addItem(this.props.data.key, item);
  },

  handleRemoveItem: function (key) {
    // Actions.removeItem(key);
  }
});

module.exports = ListContainer;
