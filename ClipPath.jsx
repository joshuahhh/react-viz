import React from 'react';
import _ from 'underscore';

var ClipPath = React.createClass({
  contextTypes: {
    setClipPathId: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      id: _.uniqueId()
    };
  },

  render() {
    const {id} = this.state;

    return (
      <defs>
        <clipPath id={id}>
          {this.props.children}
        </clipPath>
      </defs>
    );
  },

  componentDidMount() {
    this.update();
  },

  componentDidUpdate() {
    this.update();
  },

  update() {
    this.context.setClipPathId(this.state.id);
  },
});

export default ClipPath;
