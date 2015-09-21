import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

var Json = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired,
    children: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      data: undefined,
    };
  },

  // TODO: changes in url?
  componentDidMount() {
    d3.json(this.props.url, (error, data) => {
      if (error) throw error;
      this.setState({data: data});
    });
  },

  render() {
    const {data} = this.state;

    if (_.isUndefined(data)) {
      return <g/>;
    } else {
      return this.props.children(data);
    }
  },
});

export default Json;
