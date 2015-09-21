import React from 'react';
import _ from 'underscore';

import LoMixin from './LoMixin';

var LoCol = React.createClass({
  mixins: [LoMixin],

  propTypes: {
    hAlign: React.PropTypes.oneOf(['left', 'center', 'right']),
  },

  getDefaultProps() {
    return {
      vAlign: 'left',
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
      const width =  _.max(_.values(childWidths));
      const height =_.reduce(_.values(childHeights), (a, b) => a + b, 0);
      return {width, height};
    }
  },

  render() {
    const {children, hAlign} = this.props;
    const {childWidths, childHeights} = this.state;

    const width = _.max(_.values(childWidths));

    var childrenToRender = [];
    var yOffset = 0;
    React.Children.forEach(children, (child, i) => {
      const xOffset = {
        left: 0,
        center: (width - childWidths[i])/2,
        right: width - childWidths[i]
      }[hAlign] || 0;
      childrenToRender.push(
        <g key={i} transform={`translate(${xOffset}, ${yOffset})`}>{React.cloneElement(child, {loChildNum: i})}</g>
      );
      yOffset += childHeights[i] || 0;
    });
    return <g>{childrenToRender}</g>;
  },
});

export default LoCol;
