import React from 'react';
import { connect } from 'react-redux';

import DocManager from '../../components/DocManager/DocManager';
import uuid4 from 'uuid/v4';
import { useStateStore } from '../../store/stateHelpers';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';

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

  // const props.populateStateArrays = (id, docKey, val) => {
  //   dispatch({
  //     type: actionTypes.ID_VAL_TO_STATE,
  //     docKey: docKey,
  //     id: id,
  //     val: val
  //   });
  // };
  //
  // const props.valToState = (id, docKey, slice, val) => {
  //   dispatch({
  //     type: actionTypes.REPLACE_ID_VAL,
  //     id: id,
  //     docKey: docKey,
  //     slice: slice,
  //     val: val
  //   });
  // };

  const processImage = async (event, docKey) => {
    const input = event.target;
    const file = input.files[0];
    if (!file) {
      return null;
    }
    let id = uuid4();
    props.populateStateArrays(id, docKey, file.name);
    const image = await getFileImg(id, docKey, file);
    props.valToState(id, docKey, 'imgs', image);
    const result = await tesseract.recognize(image);
    console.dir(result);
    props.valToState(id, docKey, 'imgsText', result.text);
  };

  const arrayFromState = (docState, slice) => {
    return docState.ids.map(key => docState[slice][key]);
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
          docTextArray={arrayFromState(props.doc1, 'imgsText')}
        />
        <DocManager
          className="col-sm-6"
          docKey={'doc2'}
          docTextArray={arrayFromState(props.doc2, 'imgsText')}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    doc1: state.doc1,
    doc2: state.doc2
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    populateStateArrays: (id, docKey, val) => dispatch(actions.populateStateArrays),
    valToState: (id, docKey, slice, val) => dispatch(actions.valToState)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DocDiff);
