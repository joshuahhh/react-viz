import React from 'react';
import _ from 'underscore';

// To use this mixin, you must define `.getLoSize()` and `.receiveLoSizeFromChild`.

var LoMixin = {
  contextTypes: {
    reportLoSize: React.PropTypes.func,
    loChildNum: React.PropTypes.number,
  },

  childContextTypes: {
    reportLoSize: React.PropTypes.func.isRequired,
    loWidth: React.PropTypes.number,
    loHeight: React.PropTypes.number,
  },

  getChildContext() {
    const {reportedLoWidth, reportedLoHeight} = this.state;

    return {
      reportLoSize: this.receiveLoSizeFromChild,
      loWidth: reportedLoWidth,
      loHeight: reportedLoHeight,
    };
  },

  getInitialState() {
    return {
      reportedLoWidth: null,
      reportedLoHeight: null,
    };
  },

  componentDidMount() {
    this.updateLo();
  },

  componentDidUpdate() {
    this.updateLo();
  },

  updateLo() {
    // console.log('updateLo', this.constructor.displayName);
    const {reportedLoWidth, reportedLoHeight} = this.state;
    const {reportLoSize, loChildNum} = this.context;

    const size = this.getLoSize();

    if (!_.isUndefined(size)) {
      // console.log('  size is defined!');
      const {width, height} = size;
      if (reportedLoWidth != width || reportedLoHeight != height) {
        // console.log('    size is changed');
        this.setState({reportedLoWidth: width, reportedLoHeight: height});
        reportLoSize && reportLoSize(width, height, loChildNum);
      }
    }
  },
};

export default LoMixin;
