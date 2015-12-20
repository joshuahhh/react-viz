import React from 'react';
import _ from 'underscore';

import PlotRegionMixin from './PlotRegionMixin';

var Text = React.createClass({
  mixins: [PlotRegionMixin],

  render() {
    const {xD, yD, x, y, style, vAlign, hAlign, rotate} = this.props;
    const otherProps = _.omit(this.props, ['xD', 'yD', 'x', 'y', 'style']);

    // TODO: currently, only x1D-style input is allowed

    const xFinal = this.useXScale(xD) + (x || 0);
    const yFinal = this.useYScale(yD) + (y || 0);

    const textAnchor = {left: 'start', center: 'middle', right: 'end'}[hAlign];
    const dominantBaseline = {top: 'hanging', center: 'central', bottom: 'alphabetic'}[vAlign];
    const finalStyle = _.extend({dominantBaseline}, style);

    return <text
      x={xFinal} y={yFinal} style={finalStyle} textAnchor={textAnchor}
      transform={`rotate(${rotate || 0}, ${xFinal}, ${yFinal})`}
      {...otherProps} />;
  },
});

export default Text;
