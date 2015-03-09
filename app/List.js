var React = require('react');

var List = React.createClass({
  render: function () {
    var styles = require('./List.styles');

    var listItems = this.props.items.map(function (item, index) {
      return (
        <li key={index} className="list-group-item" style={styles.listGroup}>
          <span
            className="glyphicon glyphicon-remove"
            style={styles.removeItem}
            onClick={this.props.remove.bind(null, index)}
          >
          </span>
          <span style={styles.todoItem}>
            {item}
          </span>
        </li>
      );
    }.bind(this));

    return (
      <ul style={styles.uList}>
        {listItems}
      </ul>
    );
  }
});

module.exports = List;
