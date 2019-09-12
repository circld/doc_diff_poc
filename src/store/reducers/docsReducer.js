import * as actionTypes from '../actions/actionTypes';


export const docsInitialState = {
  doc1: {
    ids: [],
    filenames: {},
    imgs: {},
    imgsText: {},
  },
  doc2: {
    ids: [],
    filenames: {},
    imgs: {},
    imgsText: {},
  }
};

const addIdValToState = (state, action) => {
  const {docKey, id, val} = action;
  return {
    ...state,
    [docKey]: {
      ids: [...state[docKey].ids].concat(id),
      filenames: {...state[docKey].filenames, [id]: val},
      imgs: {...state[docKey].imgs, [id]: val},
      imgsText: {...state[docKey].imgsText, [id]: val},
    }
  };
};

const replaceIdVal = (state, action) => {
  const {docKey, id, slice, val} = action;
  if (!state[docKey][slice][id]) {
    // id no longer in state slice
    return state;
  }
  return {
    ...state,
    [docKey]: {
      ...state[docKey],
      [slice]: {...state[docKey][slice], [id]: val}
    }
  };
};

const removeIdFromState = (state, action) => {
  const doc = state[action.docKey];
  const newIds = doc.ids.filter(ind => ind !== action.id);
  const removeId = slice => newIds.reduce(
    (acc, id) => {acc[id] = doc[slice][id]; return acc;}, {});
  return {
    ...state,
    [action.docKey]: {
      ids: newIds,
      filenames: removeId('filenames'),
      imgs:  removeId('imgs'),
      imgsText: removeId('imgsText')
    }
  }
};

const reducer = (state = docsInitialState, action) => {

  switch (action.type) {

    case actionTypes.ID_VAL_TO_STATE:
      return addIdValToState(state, action);

    case actionTypes.REPLACE_ID_VAL:
      return replaceIdVal(state, action);

    case actionTypes.REMOVE_ID_FROM_STATE:
      return removeIdFromState(state, action);

    default:
      return state;
  }

};

export default reducer;
