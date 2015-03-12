var React = require('react');


var AddItem = React.createClass({

  propTypes: {
    add: React.PropTypes.func.isRequired
  },

  getDefaultProps: function () {
    return {
      add: null
    };
  },

  getInitialState: function () {
    return {
      newItem: ''
    };
  },

  render: function () {
    return (
      <div>
        <input type="text"
          className="form-control"
          value={this.state.newItem}
          placeholder="New Item"
          onChange={this.handleChange}
          onKeyDown={this.handleSubmit}
        />
      </div>
    );
  },

  handleChange: function (event) {
    this.setState({
      newItem: event.target.value
    });
  },

  handleSubmit: function (event) {
    if (event.keyCode === 13) {
      this.props.add(this.state.newItem);
      this.setState({
        newItem: ''
      });
    }
  }

});

module.exports = AddItem;
