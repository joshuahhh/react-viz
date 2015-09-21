import React from 'react';

var LoLowMixin = {
  contextTypes: {
    loWidth: React.PropTypes.number,
    loHeight: React.PropTypes.number,
  },

  getLoSize() {
    const {loWidth, loHeight} = this.context;
    return {loWidth, loHeight};
  },
};

export default LoLowMixin;
