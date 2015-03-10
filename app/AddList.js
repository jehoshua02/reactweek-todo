var React = require('react');
var ListColor = require('./ListColor');


var AddList = React.createClass({
  getInitialState: function () {
    return {
      title: '',
      color: '#005511'
    };
  },

  render: function () {
    return (
      <div className="col-sm-6">
        <h3 className="text-center">Create New List</h3>
        <input type="text" className="form-control" value={this.state.title} onChange={this.handleTitleChange} />
        <ListColor value={this.state.color} onChange={this.handleColorChange} />
        <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  },

  handleTitleChange: function (event) {
    this.setState({
      title: event.target.value
    });
  },

  handleColorChange: function (color) {
    this.setState({
      color: color
    });
  },

  handleSubmit: function (event) {
    if (this.state.title !== '') {
      this.props.onAdd(this.state);
      this.setState(this.getInitialState());
    }
  }
});

module.exports = AddList;
