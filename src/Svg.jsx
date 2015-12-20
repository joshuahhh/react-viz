import React from 'react';

import LoMixin from './LoMixin';

var Svg = React.createClass({
  mixins: [LoMixin],

  getInitialState() {
    return {
      width: 0,
      height: 0,
    };
  },

  receiveLoSizeFromChild(width, height) {
    this.setState({width, height});
  },

  getLoSize() {
    const {width, height} = this.state;
    return {width, height};
  },

  render() {
    const {children} = this.props;
    const {width, height} = this.state;

    return <svg width={width} height={height}>{children}</svg>;
  },
});

export default Svg;
