import React from 'react';
import _ from 'underscore';

var PlotRegionMixin = {
  contextTypes: {
    xScale: React.PropTypes.func,
    yScale: React.PropTypes.func,
  },

  getXScale() {
    return this.context.xScale;
  },

  getYScale() {
    return this.context.yScale;
  },

  useXScale(xD) {
    const {xScale} = this.context;

    if (xD == 'left') {
      return _.min(xScale.range());
    } else if (xD == 'right') {
      return _.max(xScale.range());
    } else if (xD == 'center') {
      return (xScale.range()[0] + xScale.range()[1]) / 2;
    } else {
      return xScale(xD);
    }
  },

  useYScale(yD) {
    const {yScale} = this.context;

    if (yD == 'top') {
      return _.min(yScale.range());
    } else if (yD == 'bottom') {
      return _.max(yScale.range());
    } else if (yD == 'center') {
      return (yScale.range()[0] + yScale.range()[1]) / 2;
    } else {
      return yScale(yD);
    }
  },

  useRawAndOrXScale(x, xD) {
    return useRawAndOrZScale(x, xD, this.useXScale);
  },

  useRawAndOrYScale(y, yD) {
    return useRawAndOrZScale(y, yD, this.useYScale);
  },

};

function useRawAndOrZScale(z, zD, useZScale) {
  return (z || 0) + (_.isUndefined(zD) ? 0 : useZScale(zD));
}

export default PlotRegionMixin;
