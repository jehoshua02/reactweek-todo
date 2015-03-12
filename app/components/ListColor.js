var React = require('react');


var ListColor = React.createClass({

  getInitialState: function () {
    return {
      colors: this.getRandomColors()
    };
  },

  render: function () {
    return (
      <div style={{
          paddingTop: 10,
          paddingBottom: 10
        }}
      >
        <div style={{marginBottom: 10}}>
          List Background Color:
          <input type="color"
            value={this.props.value}
            onChange={this.handleChange}
          />
        </div>
        <div>

        </div>
        <div>
          {this.renderColors()}
        </div>
        <div>
          <a href="#" onClick={this.shuffleColors}>Shuffle Colors</a>
        </div>
      </div>
    );
  },

  handleChange: function (event) {
    this.props.onChange(event.target.value);
  },

  renderColors: function () {
    return this.state.colors.map(function (color, index) {
      return (
        <span key={index} style={{
            backgroundColor: color,
            display: 'inline-block',
            width: '20%',
            height: 50
          }}
          onClick={this.props.onChange.bind(null, color)}
        ></span>
      );
    }.bind(this));
  },

  randomColor: function () {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  },

  getRandomColors: function () {
    var colors = [];
    for (var i = 0; i < 5; i++) {
      colors.push(this.randomColor());
    }
    return colors;
  },

  shuffleColors: function () {
    this.setState({
      colors: this.getRandomColors()
    });
  }

});

module.exports = ListColor;
