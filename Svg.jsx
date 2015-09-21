import React from 'react';

import LoMixin from './LoMixin';

var Svg = React.createClass({
  mixins: [LoMixin],

  getInitialState() {
    return {
      width: 100,
      height: 100,
    };
  },

  receiveLoSizeFromChild(width, height) {
    this.setState({width, height});
  },

  getLoSize() {
    return undefined;
  },

  render() {
    const {children} = this.props;
    const {width, height} = this.state;

    return <svg width={width} height={height}>{children}</svg>;
  },
});

export default Svg;
