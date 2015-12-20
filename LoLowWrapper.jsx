import React from 'react';

import LoLowMixin from './LoLowMixin';

var LoLowWrapper = React.createClass({
  mixins: [LoLowMixin],

  render() {
    const {loWidth, loHeight} = this.getLoSize();

    return this.props.children(loWidth, loHeight);
  },
});

export default LoLowWrapper;
