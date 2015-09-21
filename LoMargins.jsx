import React from 'react';

import LoMixin from './LoMixin';
import Hoverable from './Hoverable';

var LoMargins = React.createClass({
  mixins: [LoMixin],

  propTypes: {
    left: React.PropTypes.number.isRequired,
    right: React.PropTypes.number.isRequired,
    top: React.PropTypes.number.isRequired,
    bottom: React.PropTypes.number.isRequired,
    children: React.PropTypes.element.isRequired,
  },

  getDefaultProps() {
    return {debug: false};
  },

  getInitialState() {
    return {
      childWidth: 0,
      childHeight: 0,
      hovered: false,
    };
  },

  receiveLoSizeFromChild(width, height) {
    this.setState({childWidth: width, childHeight: height});
  },

  getLoSize() {
    const {left, right, top, bottom} = this.props;
    const {childWidth, childHeight} = this.state;

    return {width: left + childWidth + right, height: top + childHeight + bottom};
  },

  render() {
    const {left, right, top, bottom, children, debug} = this.props;
    const {width, height} = this.getLoSize();

    return (
      <g>
        {debug &&
          <Hoverable onHoverChange={(s) => this.setState({hovered: s})}>
            <rect width={width} height={height}
              style={{fill: this.state.hovered ? 'rgb(245, 245, 245)' : 'rgb(255, 255, 255)'}} />
            {this.state.hovered && [
              <line x1={width/2} x2={width/2} y1={0} y2={top} stroke='black'/>,
              <line x1={width/2} x2={width/2} y1={height} y2={height - bottom} stroke='black'/>,
              <line x1={0} x2={left} y1={height/2} y2={height/2} stroke='black'/>,
              <line x1={width - right} x2={width} y1={height/2} y2={height/2} stroke='black'/>,
            ]}
          </Hoverable>
        }
        <g transform={`translate(${left}, ${top})`}>{children}</g>
      </g>
    );
  },
});

export default LoMargins;
