import React from 'react';

var Hoverable = React.createClass({
  render() {
    return (
      <g onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
        {this.props.children}
      </g>
    );
  },

  onMouseOver() {
    this.props.onHoverChange(true);
  },

  onMouseOut() {
    this.props.onHoverChange(false);
  },

});

export default Hoverable;
