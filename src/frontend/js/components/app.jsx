const React = require('react');
const { identity } = require('ramda');
const Flickr = require('./flickr')
const Collage = require('./collage')
const { search, changeTerm } = require('../actionCreators');

const App = ({
  search,
  changeTerm,
  searchTerm,
  photos,
  collage,
  updateCollage,
  saveCollage,
  loadCollage,
  error
}) => (
  <div id="app">
    { error && <p>{error}</p>}
    <Flickr
      photos={photos}
      onSearchClicked={() => search(searchTerm)}
      onTermChanged={changeTerm}
      term={searchTerm} />
    <Collage
      updateCollage={updateCollage}
      loadCollage={loadCollage}
      onSaveClick={saveCollage}
      photos={collage} />
  </div>
);

module.exports = App;
