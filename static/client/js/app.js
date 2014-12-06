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
    return (
      <div className={classes} onClick={this.handleClick}>
        <figure className="front">F</figure>
        <figure className="back">B</figure>
      </div>
    );
  }
});

var Board = React.createClass({
  getInitialState: function() {
    return {selected: null};
  },
  isSelected: function(name) {
    return this.state.selected === name;
  },
  setSelected: function(name) {
    this.setState({selected: name});
  },
  render: function() {
    var children = React.Children.map(this.props.children, function(child) {
      return React.addons.cloneWithProps(child, {
        isSelected: this.isSelected,
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
            <Card name={"a"} />
            <Card name={"b"} />
            <Card name={"c"} />
            <Card name={"d"} />
          </Board>
      );
  }
});

App.start = function() {
  React.render(<App/>, document.getElementById("app"));
};

module.exports = window.App = App;
