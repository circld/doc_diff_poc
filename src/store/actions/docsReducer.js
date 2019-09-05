import * as actionTypes from './actionTypes';


export const populateStateArrays = (id, docKey, val) => {
  return {
    type: actionTypes.ID_VAL_TO_STATE,
    docKey: docKey,
    id: id,
    val: val
  };
};

export const valToState = (id, docKey, slice, val) => {
  return {
    type: actionTypes.REPLACE_ID_VAL,
    id: id,
    docKey: docKey,
    slice: slice,
    val: val
  };
};
