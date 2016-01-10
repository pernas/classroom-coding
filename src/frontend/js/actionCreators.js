const { createAction } = require('redux-actions');
const { flickrSearch, save, load } = require('./model')

const search = createAction('SEARCH', flickrSearch);
const changeTerm = createAction('CHANGE_TERM');
const updateCollage = createAction('UPDATE_COLLAGE');
const saveCollage = createAction('SAVE_COLLAGE', save);
const loadCollage = createAction('LOAD_COLLAGE', () => load);

module.exports = {
  search,
  changeTerm,
  updateCollage,
  saveCollage,
  loadCollage
};
