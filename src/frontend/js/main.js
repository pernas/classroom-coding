const React = require('react');
const { Provider } = require('react-redux');
const Dom = require('react-dom');
const App = require('./containers/appContainer');
const {ajaxSetup} = require('jquery');
const Store = require('./store.js');

ajaxSetup({headers: {'Content-Type': 'application/json'}})

Dom.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('main')
);
