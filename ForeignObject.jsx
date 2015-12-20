import React from 'react';

import LoLowMixin from './LoLowMixin';

var ForeignObject = React.createClass({
  mixins: [LoLowMixin],

  render() {
    const {loWidth, loHeight} = this.getLoSize();

    return (
      <foreignObject width={loWidth} height={loHeight}>
        {this.props.children}
      </foreignObject>
    );
  },
});

export default ForeignObject;
