import React from 'react';

import DocManager from '../../components/DocManager/DocManager';
import uuid4 from 'uuid/v4';
import { useStateStore } from '../../store/stateHelpers';
import * as actionTypes from '../../store/actionTypes';

const tesseract = window.Tesseract;


const docDiff = props => {

  const [state, dispatch] = useStateStore();

  const readFile = (id, docKey, file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const image = reader.result;
        resolve({id, docKey, image});
      };
      reader.readAsDataURL(file);
    })
  };

  const valToState = (id, docKey, image) => {
    dispatch({
      type: actionTypes.REPLACE_ID_VAL,
      id: id,
      docKey: docKey,
      slice: 'imgs',
      val: image
    });
    return ({id, docKey, image})
  };

  const textFromImg = (id, docKey, image) => {
    tesseract.recognize(image)
      .then(result => dispatch({
          type: actionTypes.REPLACE_ID_VAL,
          id: id,
          docKey: docKey,
          slice: 'imgsText',
          val: result.text
        })
      )
  };

  const processImage = (event, docKey) => {
    const input = event.target;
    const file = input.files[0];
    if (!file) {
      return null;
    }
    let id = uuid4();
    new Promise((resolve, reject) => {
      dispatch({
        type: actionTypes.ID_VAL_TO_STATE,
        docKey: docKey,
        id: id,
        val: file.name
      });
      resolve({id, docKey, file})
    })
      .then(({id, docKey, file}) => readFile(id, docKey, file))
      .then(({id, docKey, image}) => valToState(id, docKey, image))
      .then(({id, docKey, image}) => textFromImg(id, docKey, image));
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


export default docDiff;