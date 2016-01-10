const React = require('react')
const DragImage = require('./dragImage');
const { map } = require('ramda');

const DragImages = map(({ src, y, x }) => <DragImage src={src} style={{top: y, left: x}} />);

module.exports = DragImages;
