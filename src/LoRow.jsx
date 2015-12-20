import React from 'react';
import _ from 'underscore';

import LoMixin from './LoMixin';
import LoChild from './LoChild';

var LoRow = React.createClass({
  mixins: [LoMixin],

  propTypes: {
    vAlign: React.PropTypes.oneOf(['top', 'center', 'bottom']),
  },

  getDefaultProps() {
    return {
      vAlign: 'top',
    };
  },

  getInitialState() {
    return {
      childWidths: {},
      childHeights: {},
    };
  },

  receiveLoSizeFromChild(width, height, loChildNum) {
    const {childWidths, childHeights} = this.state;

    childWidths[loChildNum] = width;
    childHeights[loChildNum] = height;
    this.setState({childWidths, childHeights});
  },

  getLoSize() {
    const {children} = this.props;
    const {childWidths, childHeights} = this.state;

    const numChildren = React.Children.count(children);

    if (_.keys(childWidths).length == numChildren) {
      const width = _.reduce(_.values(childWidths), (a, b) => a + b, 0);
      const height = _.max(_.values(childHeights));
      return {width, height};
    }
  },

  render() {
    const {children, vAlign} = this.props;
    const {childWidths, childHeights} = this.state;

    const height = _.max(_.values(childHeights));

    var childrenToRender = [];
    var xOffset = 0;
    React.Children.forEach(children, (child, i) => {
      const yOffset = {
        top: 0,
        center: (height - childHeights[i])/2,
        bottom: height - childHeights[i]
      }[vAlign] || 0;
      childrenToRender.push(
        <LoChild key={i} loChildNum={i} transform={`translate(${xOffset}, ${yOffset})`}>
          {child}
        </LoChild>
      );
      xOffset += childWidths[i] || 0;
    });
    return <g>{childrenToRender}</g>;
  },
});

export default LoRow;
