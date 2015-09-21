import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

import PlotRegionMixin from './PlotRegionMixin';

var Path = React.createClass({
  mixins: [PlotRegionMixin],

  render() {
    const {points, pointsD, interpolate} = this.props;
    const otherProps = _.omit(this.props, ['points', 'interpolate']);

    const generator = d3.svg.line().interpolate(interpolate || "linear");
    var pathStr;

    if (!_.isUndefined(points) && _.isUndefined(pointsD)) {
      generator
        .x(d => d.x)
        .y(d => d.y);
      pathStr = generator(points);
    } else if (!_.isUndefined(pointsD) && _.isUndefined(points)) {
      generator
        .x(d => this.useXScale(d.x))
        .y(d => this.useYScale(d.y));
      pathStr = generator(pointsD);
    } else {
      throw 'DAMMIT';
    }

    return <path d={pathStr} {...otherProps}/>;
  },
});

export default Path;
