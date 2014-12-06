/** @jsx React.DOM */
var React = window.React = require("react/addons"),
    App;

var Card = React.createClass({
  handleClick: function(event) {
    this.props.setSelected(this.props.name);
  },
  render: function() {
    var classes = React.addons.classSet({
      "card": true,
      "selected": this.props.isSelected(this.props.name)
    });
    var backClasses = {
      back: true
    };
    backClasses[this.props.cardClass(this.props.name)] = true;
    return (
      <div className={classes} onClick={this.handleClick}>
        <figure className="front">
          <span>{this.props.isWinner(this.props.name) ? "winner": "loser"}</span>
        </figure>
        <figure className={React.addons.classSet(backClasses)}></figure>
      </div>
    );
  }
});

var cards = ["cake", "chocolate", "cookies", "peppermint"];

function rand(n) {
  return Math.floor(Math.random() * n);
}

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = rand(i + 1);
    var tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
  return array;
}

var Board = React.createClass({
  getInitialState: function() {
    return {
      selected: null,
      order: shuffle(cards.slice(0)),
      winner: rand(cards.length)
    };
  },
  shuffle: function() {
    self.setState({
      order: shuffle(cards.slice(0)),
      winner: rand(cards.length)
    });
  },
  cardClass: function(name) {
    return this.state.order[name];
  },
  isSelected: function(name) {
    return this.state.selected === name;
  },
  isWinner: function(name) {
    return this.state.winner === name;
  },
  setSelected: function(name) {
    this.setState({selected: name});
  },
  render: function() {
    var children = React.Children.map(this.props.children, function(child) {
      return React.addons.cloneWithProps(child, {
        cardClass: this.cardClass,
        isSelected: this.isSelected,
        isWinner: this.isWinner,
        setSelected: this.setSelected
      });
    }, this);
    return (
      <div className="board">
        {children}
      </div>
    );
  }
});

App = React.createClass({
  render: function() {
      return (
          <Board>
            <Card name={0} />
            <Card name={1} />
            <Card name={2} />
            <Card name={3} />
          </Board>
      );
  }
});

App.start = function() {
  React.render(<App/>, document.getElementById("app"));
};

module.exports = window.App = App;
