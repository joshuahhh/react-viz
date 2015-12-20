import React from 'react';
import d3 from 'd3';

import LoLowMixin from './LoLowMixin';

var PlotRegion = React.createClass({
  mixins: [LoLowMixin],

  propTypes: {
    xDomain: React.PropTypes.arrayOf(React.PropTypes.number),
    xRange: React.PropTypes.arrayOf(React.PropTypes.number),
    yDomain: React.PropTypes.arrayOf(React.PropTypes.number),
    yRange: React.PropTypes.arrayOf(React.PropTypes.number),
  },

  childContextTypes: {
    xScale: React.PropTypes.func,
    yScale: React.PropTypes.func,
  },

  getChildContext() {
    var {xScale, yScale} = this.props;
    const {xDomain, yDomain, xRange, yRange} = this.props;
    const {loWidth, loHeight} = this.getLoSize();

    const xDomainF = xDomain || (loWidth && [0, loWidth]);
    const yDomainF = yDomain || (loHeight && [0, loHeight]);
    const xRangeF = xRange || (loWidth && [0, loWidth]);
    const yRangeF = yRange || (loHeight && [0, loHeight]);

    // TODO: check valid inputs!
    if (xDomainF && xRangeF) {
      xScale = d3.scale.linear().domain(xDomainF).range(xRangeF);
    } else {
      // TODO: TERRIBLE
      xScale = d3.scale.linear().domain([0, 1]).range([0, 1]);
    }
    if (yDomainF && yRangeF) {
      yScale = d3.scale.linear().domain(yDomainF).range(yRangeF);
    } else {
      // TODO: TERRIBLE
      yScale = d3.scale.linear().domain([0, 1]).range([0, 1]);
    }
    return {xScale, yScale};
  },

  render() {
    return <g>{this.props.children}</g>;
  },
});

export default PlotRegion;
