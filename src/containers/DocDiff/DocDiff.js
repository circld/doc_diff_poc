import React from 'react';

import DocManager from '../../components/DocManager/DocManager';
import uuid4 from 'uuid/v4';
import { useStateStore } from '../../store/stateHelpers';
import * as actionTypes from '../../store/actionTypes';

const tesseract = window.Tesseract;


const DocDiff = props => {

  const [state, dispatch] = useStateStore();

  const getFileImg = (id, docKey, file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const image = reader.result;
        resolve(image);
      };
      reader.readAsDataURL(file);
    })
  };

  const populateStateArrays = (id, docKey, val) => {
    dispatch({
      type: actionTypes.ID_VAL_TO_STATE,
      docKey: docKey,
      id: id,
      val: val
    });
  };

  const valToState = (id, docKey, slice, val) => {
    dispatch({
      type: actionTypes.REPLACE_ID_VAL,
      id: id,
      docKey: docKey,
      slice: slice,
      val: val
    });
  };

  const processImage = async (event, docKey) => {
    const input = event.target;
    const file = input.files[0];
    if (!file) {
      return null;
    }
    let id = uuid4();
    populateStateArrays(id, docKey, file.name);
    const image = await getFileImg(id, docKey, file);
    valToState(id, docKey, 'imgs', image);
    const result = await tesseract.recognize(image);
    console.dir(result);
    valToState(id, docKey, 'imgsText', result.text);
  };

  const arrayFromState = (docKey, slice) => {
    return state[docKey].ids.map(key => state[docKey][slice][key]);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <input type="file" onChange={(e) => processImage(e, 'doc1')}/>
        <input type="file" onChange={(e) => processImage(e, 'doc2')}/>
      </div>
      <div className="row">
        <DocManager
          className="col-sm-6"
          docKey={'doc1'}
          docTextArray={arrayFromState('doc1', 'imgsText')}
        />
        <DocManager
          className="col-sm-6"
          docKey={'doc2'}
          docTextArray={arrayFromState('doc2', 'imgsText')}
        />
      </div>
    </div>
  );
};


export default DocDiff;
