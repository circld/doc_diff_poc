import uuid4 from 'uuid/v4';
import * as actionTypes from './actionTypes';

import { getFileImage } from '../../utils/helpers';

const tesseract = window.Tesseract;


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

export const removeFromState = (id, docKey) => {
  return {
    type: actionTypes.REMOVE_ID_FROM_STATE,
    docKey: docKey,
    id: id
  };
};

export const processImage = (file, docKey) => {
  return async dispatch => {
    if (!file) {
      return null;
    }
    let id = uuid4();
    dispatch(populateStateArrays(id, docKey, file.name));
    const image = await getFileImage(id, docKey, file);
    dispatch(valToState(id, docKey, 'idImageMap', image));
    const result = await tesseract.recognize(image);
    console.dir(result);
    dispatch(valToState(id, docKey, 'idTextMap', result.text));
  }
};
