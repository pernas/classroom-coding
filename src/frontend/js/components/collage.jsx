const React = require('react')
const DragImages = require('./dragImages')
const { append } = require('ramda')
const { preventDefault } = require('../utils')
const { Photo, replacePhoto } = require('../model')
const ComponentWillMount = require('./componentWillMount');

const Collage = ({
  photos,
  onSaveClick,
  updateCollage
}) => {
  const onDrop = ({dataTransfer: dt, clientX: x, clientY: y, currentTarget: t}) => {
    const offset = t.getBoundingClientRect().top;
    const src = dt.getData('text');
    const photo = Photo(src, x, (y - offset));
    updateCollage(replacePhoto(photo, photos));
  };

  return (
    <div>
      <button onClick={() => onSaveClick(photos)}>Save</button>
      <div id="collage" onDrop={onDrop} onDragOver={preventDefault}>
        <div id="photos">{DragImages(photos)}</div>
      </div>
    </div>
  );
};
module.exports = ComponentWillMount(({ loadCollage }) => loadCollage(), Collage);
