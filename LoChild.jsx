import React from 'react';

// Does two things:
//  * transforms child (could have been done inline)
//  * provides loChildNum as context (couldn't have been done inline)
var LoChild = React.createClass({
  propTypes: {
    transform: React.PropTypes.string.isRequired,
    loChildNum: React.PropTypes.number.isRequired,
  },

  childContextTypes: {
    loChildNum: React.PropTypes.number.isRequired,
  },

  getChildContext() {
    return { loChildNum: this.props.loChildNum };
  },

  render() {
    const {transform, children} = this.props;
    return <g transform={transform}>{children}</g>;
  },
});

export default LoChild;
