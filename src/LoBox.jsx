import React from 'react';

import LoMixin from './LoMixin';

var LoBox = React.createClass({
  mixins: [LoMixin],

  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
  },

  receiveLoSizeFromChild(_width, _height) {
    throw 'Size was reported from a conspirator under a leaf. Not good.';
  },

  getLoSize() {
    return {width: this.props.width, height: this.props.height};
  },

  render() {
    return <g>{this.props.children}</g>;
  },
});

export default LoBox;
