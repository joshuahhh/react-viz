import React from 'react';
import _ from 'underscore';

import PlotRegionMixin from './PlotRegionMixin';
import {noneOf} from './utils';

var Rect = React.createClass({
  mixins: [PlotRegionMixin],

  render() {
    const
      {x1, x1D, x2, x2D, x, xD, width,
       y1, y1D, y2, y2D, y, yD, height} = this.props;
    const otherProps = _.omit(this.props,
      ['x1', 'x1D', 'x2', 'x2D', 'x', 'xD', 'width',
       'y1', 'y1D', 'y2', 'y2D', 'y', 'yD', 'height']);

    // TODO: currently, only x1D-style input is allowed

    const {x: xFinal, width: widthFinal} = Rect.processCoords({
      x1: x1, x1D: x1D, x2: x2, x2D: x2D, x: x, xD: xD, width: width, useRawAndOrXScale: this.useRawAndOrXScale
    });
    const {x: yFinal, width: heightFinal} = Rect.processCoords({
      x1: y1, x1D: y1D, x2: y2, x2D: y2D, x: y, xD: yD, width: height, useRawAndOrXScale: this.useRawAndOrYScale
    });

    return <rect x={xFinal} width={widthFinal} y={yFinal} height={heightFinal} {...otherProps}/>;
  },

  statics: {
    processCoords({x1, x1D, x2, x2D, x, xD, width, useRawAndOrXScale}) {
      if (noneOf(x, xD, width)) {
        x1 = useRawAndOrXScale(x1, x1D);
        x2 = useRawAndOrXScale(x2, x2D);
      } else if (noneOf(x1, x1D, x2, x2D)) {
        x = useRawAndOrXScale(x, xD);
        width = width || 0;
        // Now x & width should be defined.
        x1 = x;
        x2 = x + width;
      } else {
        throw 'OH NO TERRIBLE';
      }
      // Now x1 & x2 should be defined.
      if (x1 > x2) {
        [x1, x2] = [x2, x1];
      }
      width = x2 - x1;
      return {
        x: x1,
        width: width,
      };
    }
  }

});

export default Rect;
