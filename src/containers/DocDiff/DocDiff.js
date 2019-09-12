import React from 'react';
import { connect } from 'react-redux';

import DocManager from '../../components/DocManager/DocManager';
import * as actions from '../../store/actions/index';


const DocDiff = props => {

  const arrayFromState = (docState, slice) => {
    return docState.ids.map(key => docState[slice][key]);
  };

  const fileFromEvent = event => {
    const input = event.target;
    return input.files[0];
  };

  return (
    <div className="container my-5">
      <div className="row">
        <input
          type="file"
          onChange={(e) => props.processImage(fileFromEvent(e), 'doc1')}
        />
        <input
          type="file"
          onChange={(e) => props.processImage(fileFromEvent(e), 'doc2')}
        />
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
    doc1: state.docsReducer.doc1,
    doc2: state.docsReducer.doc2
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    populateStateArrays: (id, docKey, val) => dispatch(actions.populateStateArrays(id, docKey, val)),
    valToState: (id, docKey, slice, val) => dispatch(actions.valToState(id, docKey, slice, val)),
    processImage: (file, docKey) => dispatch(actions.processImage(file, docKey)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DocDiff);
