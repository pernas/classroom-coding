const { assoc, dissoc, compose } = require('ramda');

const initialState = {
  searchTerm: '',
  collage: [],
  photos: [],
  error: null
};

function reducer(state = initialState, { type, payload, error }) {
  switch (type) {
  case 'CHANGE_TERM':
    return assoc('searchTerm', payload, state);
  case 'SEARCH':
    if (error) return assoc('error', payload.statusText || payload.message, state);

    return compose( assoc('photos', payload)
                  , dissoc('error')
                  )( state);
  case 'UPDATE_COLLAGE':
  case 'LOAD_COLLAGE':
    return assoc('collage', payload, state);
  default:
    return state
  }
}

module.exports = reducer;
