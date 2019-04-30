import React from 'react';

import DocManager from '../../components/DocManager/DocManager';
import { useStateStore } from '../../store/stateHelpers';
import * as actionTypes from '../../store/actionTypes';

const tesseract = window.Tesseract;


const docDiff = props => {

  const [state, dispatch] = useStateStore();

  const readFile = (idx, docKey, file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const image = reader.result;
        resolve({idx, docKey, image});
      };
      reader.readAsDataURL(file);
    })
  };

  const spliceImgIntoArray = (idx, docKey, image) => {
    dispatch({
      type: actionTypes.SPLICE_INTO_ARRAY,
      idx: idx,
      docKey: docKey,
      key: 'imgs',
      value: image
    });
    return ({idx, docKey, image})
  };

  const textFromImg = (idx, docKey, image) => {
    tesseract.recognize(image)
      .then(result => dispatch({
          type: actionTypes.SPLICE_INTO_ARRAY,
          idx: idx,
          docKey: docKey,
          key: 'imgsText',
          value: result.text
        })
      )
  };

  const processImage = (event, docKey) => {
    const input = event.target;
    const file = input.files[0];
    let idx = state[docKey].filenames.length;
    new Promise((resolve, reject) => {
      dispatch({type: actionTypes.INC_STATE_ARRAYS, docKey: docKey, filename: file.name});
      resolve({idx, docKey, file})
    })
      .then(({idx, docKey, file}) => readFile(idx, docKey, file))
      .then(({idx, docKey, image}) => spliceImgIntoArray(idx, docKey, image))
      .then(({idx, docKey, image}) => textFromImg(idx, docKey, image));
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
          imgArray={state.doc1.imgs}
          docTextArray={state.doc1.imgsText}
        />
        <DocManager
          className="col-sm-6"
          imgArray={state.doc2.imgs}
          docTextArray={state.doc2.imgsText}
        />
      </div>
    </div>
  );
};


export default docDiff;