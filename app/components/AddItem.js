var React = require('react');


var AddItem = React.createClass({

  getInitialState: function () {
    return { newItem: '' };
  },

  render: function () {
    return (
      <div>
        <input type="text"
          className="form-control"
          value={this.state.newItem}
          placeholder="New Item"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  },

  handleChange: function (event) {
    this.setState({ newItem: event.target.value });
  },

  handleKeyDown: function (event) {
    var ENTER = 13;
    if (event.keyCode === ENTER) {
      this.props.addItem(this.state.newItem);
      this.setState({ newItem: '' });
    }
  }

});

module.exports = AddItem;
