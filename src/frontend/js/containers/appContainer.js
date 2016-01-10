const React = require('react');
const { identity, compose } = require('ramda');
const { connect } = require('react-redux');

const { search, changeTerm, updateCollage, saveCollage, loadCollage } = require('../actionCreators');
const App = require('../components/app')


function mapDispatchToProps(dispatch) {
  return {
    search: compose(dispatch, search),
    changeTerm: compose(dispatch, changeTerm),
    updateCollage: compose(dispatch, updateCollage),
    saveCollage: compose(dispatch, saveCollage),
    loadCollage: compose(dispatch, loadCollage)
  }
}

module.exports = connect(
  identity,
  mapDispatchToProps
)(App)
