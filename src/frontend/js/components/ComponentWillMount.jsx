const React = require('react');
const { curry } = require('ramda');

const ComponentWillMount = curry((cb, Component) => {
  return React.createClass({
    componentWillMount: function() {
      cb(this.props);
    },

    render: function() {
      return <Component {...this.props} />;
    }
  });
});
module.exports = ComponentWillMount;
