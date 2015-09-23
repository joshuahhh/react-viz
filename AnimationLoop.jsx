import React from 'react';

var AnimationLoop = React.createClass({
  getInitialState() {
    return {
      // TODO: delta
      // lastStepTime: undefined,
    };
  },

  render() {
    return <g>{this.props.children}</g>;
  },

  componentDidMount() {
    this.loop();
  },

  componentWillUnmount() {
    window.cancelAnimationFrame(this.loop);
  },

  loop() {
    this.props.step();
    this.requestId = window.requestAnimationFrame(this.loop);
  }
});

export default AnimationLoop;
