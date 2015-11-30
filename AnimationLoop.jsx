import React from 'react';

var AnimationLoop = React.createClass({
  getInitialState() {
    return {
      lastStepTime: undefined,
    };
  },

  render() {
    return <g>{this.props.children}</g>;
  },

  componentDidMount() {
    this.loop();
  },

  componentWillUnmount() {
    window.cancelAnimationFrame(this.requestId);
  },

  loop() {
    const {targetFps} = this.props;
    const {lastStepTime} = this.state;
    const thisStepTime = Date.now();
    const elapsed = thisStepTime - lastStepTime;
    if (!lastStepTime || !targetFps || elapsed > 1000 / targetFps) {
      this.props.step(lastStepTime && elapsed);
      this.setState({lastStepTime: thisStepTime});
    }
    this.requestId = window.requestAnimationFrame(this.loop);
  }
});

export default AnimationLoop;
