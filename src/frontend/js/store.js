const { compose } = require('ramda');
const Either = require('data.either');
const { createStore, applyMiddleware } = require('redux');
const futureMiddleware = require('redux-future').default;
const eitherMiddleware = require('redux-either').default;
const reducer = require('./reducer');


const finalCreateStore = compose(
  applyMiddleware(futureMiddleware, eitherMiddleware(Either, (l, r, e) => e.fold(l, r))),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

module.exports = finalCreateStore(reducer);
