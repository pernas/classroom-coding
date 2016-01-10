const initialState = {
  searchTerm: '',
  collage: [],
  photos: [],
  error: null
};

function reducer(state = initialState, { type, payload, error }) {
  switch (type) {
  case 'CHANGE_TERM':
    return {
      ...state,
      searchTerm: payload
    };
  case 'SEARCH':
    if (error) {
      return {
        ...state,
        error: payload.statusText + ' ' + payload.status
      };
    }
    return {
      ...state,
      photos: payload
    };
  case 'UPDATE_COLLAGE':
  case 'LOAD_COLLAGE':
    return {
      ...state,
      collage: payload
    };
  default:
    return state
  }
}

module.exports = reducer;
