import * as actionTypes from './actionTypes';


export const docsInitialState = {
  doc1: {
    filenames: [],
    imgs: [],
    imgsText: []
  },
  doc2: {
    filenames: [],
    imgs: [],
    imgsText: []
  }
};

const incrementStateArrays = (state, action) => {
  const {docKey, filename} = action;
  return {
    ...state,
    [docKey]: {
      filenames: state[docKey].filenames.concat(filename),
      imgs: state[docKey].imgs.concat(filename),
      imgsText: state[docKey].imgsText.concat(filename)
    }
  };
};

const spliceValIntoArray = (state, action) => {
  const {idx, docKey, key, value} = action;
  const arrayCopy = [...state[docKey][key]];
  arrayCopy.splice(idx, 1, value);
  return {
    ...state,
    [docKey]: {
      ...state[docKey],
      [key]: arrayCopy
    }
  }

};

const reducer = (state, action) => {

  switch (action.type) {

    case actionTypes.INC_STATE_ARRAYS:
      return incrementStateArrays(state, action);

    case actionTypes.SPLICE_INTO_ARRAY:
      return spliceValIntoArray(state, action);

    default:
      return state;
  }

};

export default reducer;