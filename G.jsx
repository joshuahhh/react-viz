import React from 'react';
import _ from 'underscore';

import PlotRegionMixin from './PlotRegionMixin';

var G = React.createClass({
  mixins: [PlotRegionMixin],

  childContextTypes: {
    setClipPathId: React.PropTypes.func.isRequired,
  },

  getChildContext() {
    return {
      setClipPathId: (clipPathId) => {
        if (clipPathId != this.state.clipPathId) {
          this.setState({clipPathId});
        }
      }
    };
  },

  getInitialState() {
    return {
      clipPathId: undefined,
    };
  },

  render() {
    const {x, xD, y, yD, rotate} = this.props;
    const otherProps = _.omit(this.props, ['x', 'xD', 'y', 'yD', 'rotate']);
    const {clipPathId} = this.state;

    const xF = this.useRawAndOrXScale(x, xD);
    const yF = this.useRawAndOrYScale(y, yD);
    const transform = `translate(${xF}, ${yF})` + (rotate ? ` rotate(${rotate})` : '');

    const clipPath = clipPathId ? `url(#${clipPathId})` : '';

    return <g clipPath={clipPath} transform={transform} {...otherProps}>{this.props.children}</g>;
  },
});

export default G;
