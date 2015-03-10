var React = require('react');
var AddItem = require('./AddItem');
var List = require('./List');

var ListContainer = React.createClass({
  getInitialState: function(){
    return {
      list: []
    }
  },
  handleAddItem: function(newItem){
    this.setState({
      list: this.state.list.concat([newItem])
    });
  },
  handleRemoveItem: function(index){
    var newList = this.state.list;
    newList.splice(index, 1);
    this.setState({
      list: newList
    })
  },
  render: function(){
    var styles = require('./ListContainer.styles.js');
    styles.container.backgroundColor = this.props.color;

    return (
      <div className="col-sm-6">
        <div className="col-sm-12" style={styles.container}>
          <span
            className="glyphicon glyphicon-remove"
            style={styles.remove}
            onClick={this.props.onRemove.bind(null, this.props.index)}
          >
          </span>
          <h3 className="text-center">{this.props.title}</h3>
          <AddItem add={this.handleAddItem} />
          <List items={this.state.list} remove={this.handleRemoveItem}/>
        </div>
      </div>
    )
  }
});

module.exports = ListContainer;
