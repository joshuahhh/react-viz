import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

import PlotRegionMixin from './PlotRegionMixin';

var Axis = React.createClass({
  mixins: [PlotRegionMixin],

  render() {
    var {orient, className} = this.props;

    const [left, right] = _.sortBy(this.getXScale().range());
    const [top, bottom] = _.sortBy(this.getYScale().range());

    const transform = {
      top: `translate(${left}, ${top})`,
      bottom: `translate(${left}, ${bottom})`,
      left: `translate(${left}, ${top})`,
      right: `translate(${right}, ${top})`,
    }[orient];

    return <g ref='g' transform={transform} className={className}/>;
  },

  componentDidMount() {
    this.update();
  },

  componentDidUpdate() {
    this.update();
  },

  update() {
    const {orient, labelX, labelY, labelStyle, tickFormat, ticks} = this.props;

    const node = d3.select(this.refs.g);

    var scale;
    if (orient == 'left' || orient == 'right') {
      scale = this.getYScale();
    } else if (orient == 'top' || orient == 'bottom') {
      scale = this.getXScale();
    } else {
      throw 'BAD ORIENT OH NO';
    }

    var generator = d3.svg.axis()
      .scale(scale)
      .orient(orient);

    if (tickFormat) {
      generator.tickFormat(tickFormat);
    }

    if (ticks) {
      generator.ticks(ticks);
    }

    node.call(generator);

    const labels = node.selectAll('text');
    if (!_.isUndefined(labelX)) {
      labels.attr('x', labelX);
    }
    if (!_.isUndefined(labelY)) {
      labels.attr('y', labelY);
    }
    if (!_.isUndefined(labelStyle)) {
      labels.style(labelStyle);
    }
  },
});

export default Axis;
