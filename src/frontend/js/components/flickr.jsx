const React = require('react')
const { flickrSearch } = require('../model');
const DragImages = require('./dragImages');


const Flickr = ({
  onTermChanged,
  onSearchClicked,
  term,
  photos
}) => (
  <div id="flickr">
    <input onChange={({ target }) => onTermChanged(target.value)} defaultValue={term} />
    <button onClick={onSearchClicked}>Search</button>
    <div id="results">{DragImages(photos)}</div>
  </div>
);

module.exports = Flickr;

