var React = require('react');
var AddItem = require('./AddItem');
var List = require('./List');
var Firebase = require('firebase');


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
          <AddItem add={this.handleAddItem} />
          {this.renderList()}
        </div>
      </div>
    )
  },

  componentDidMount: function () {
    this.firebase = new Firebase(this.props.firebaseUrl);
    this.firebase.on('child_added', this.handleItemAdded);
    this.firebase.on('child_removed', this.handleItemRemoved);
  },

  componentWillUnmount: function () {
    this.firebase.off('child_added', this.handleItemAdded);
    this.firebase.off('child_removed', this.handleItemRemoved);
  },

  renderList: function () {
    var styles = require('./List.styles');

    var listItems = this.state.items.map(function (item) {
      return (
        <li key={item.key} className="list-group-item" style={styles.listGroup}>
          <span
            className="glyphicon glyphicon-remove"
            style={styles.removeItem}
            onClick={this.handleRemoveItem.bind(null, item.key)}
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
    this.firebase.push(item);
  },

  handleItemAdded: function (snapshot) {
    var item = { value: snapshot.val(), key: snapshot.key() };
    this.setState({ items: this.state.items.concat(item) });
  },

  handleRemoveItem: function(key) {
    this.firebase.child(key).remove();
  },

  handleItemRemoved: function (snapshot) {
    var key = snapshot.key();
    var items = this.state.items.filter(function (item) { return item.key !== key; });
    this.setState({ items: items });
  }
});

module.exports = ListContainer;
