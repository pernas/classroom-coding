const { compose } = require('ramda');
const { createStore, applyMiddleware } = require('redux');
const futureMiddleware = require('redux-future').default;
const reducer = require('./reducer');

const finalCreateStore = compose(
  applyMiddleware(futureMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

module.exports = finalCreateStore(reducer);
