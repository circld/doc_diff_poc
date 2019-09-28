import * as actionTypes from '../actions/actionTypes';


export const docsInitialState = {
  doc1: {
    ids: [],
    idFilenameMap: {},
    idImageMap: {},
    idTextMap: {},
  },
  doc2: {
    ids: [],
    idFilenameMap: {},
    idImageMap: {},
    idTextMap: {},
  }
};

const addIdValToState = (state, action) => {
  const {docKey, id, val} = action;
  return {
    ...state,
    [docKey]: {
      ids: [...state[docKey].ids].concat(id),
      idFilenameMap: {...state[docKey].idFilenameMap, [id]: val},
      idImageMap: {...state[docKey].idImageMap, [id]: val},
      idTextMap: {...state[docKey].idTextMap, [id]: val},
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
  const newIds = doc.ids.filter(id => id !== action.id);
  const removeId = slice => newIds.reduce(
    (acc, id) => {acc[id] = doc[slice][id]; return acc;}, {});
  return {
    ...state,
    [action.docKey]: {
      ids: newIds,
      idFilenameMap: removeId('idFilenameMap'),
      idImageMap:  removeId('idImageMap'),
      idTextMap: removeId('idTextMap')
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
