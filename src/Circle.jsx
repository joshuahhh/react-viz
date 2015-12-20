import React from 'react';
import _ from 'underscore';

import PlotRegionMixin from './PlotRegionMixin';

var Circle = React.createClass({
  mixins: [PlotRegionMixin],

  render() {
    const {cx, cxD, cy, cyD} = this.props;
    const otherProps = _.omit(this.props, ['cx', 'cxD', 'cy', 'cyD']);

    const cxF = this.useRawAndOrXScale(cx, cxD);
    const cyF = this.useRawAndOrYScale(cy, cyD);

    return <circle cx={cxF} cy={cyF} {...otherProps}/>;
  },
});

export default Circle;
