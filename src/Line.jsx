import React from 'react';
import _ from 'underscore';

import PlotRegionMixin from './PlotRegionMixin';

var Line = React.createClass({
  mixins: [PlotRegionMixin],

  render() {
    const {x1, x1D, x2, x2D, y1, y1D, y2, y2D} = this.props;
    const otherProps = _.omit(this.props, ['x1', 'x1D', 'x2', 'x2D', 'y1', 'y1D', 'y2', 'y2D']);

    const x1F = this.useRawAndOrXScale(x1, x1D);
    const x2F = this.useRawAndOrXScale(x2, x2D);
    const y1F = this.useRawAndOrYScale(y1, y1D);
    const y2F = this.useRawAndOrYScale(y2, y2D);

    return  <line x1={x1F} x2={x2F} y1={y1F} y2={y2F} {...otherProps}/>;
  },
});

export default Line;
