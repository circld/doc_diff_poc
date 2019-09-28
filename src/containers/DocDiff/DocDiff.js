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
          ids={props.doc1.ids}
          docKey="doc1"
          idImageMap={props.doc1.idImageMap}
          docTextArray={arrayFromState(props.doc1, 'idTextMap')}
        />
        <DocManager
          className="col-sm-6"
          ids={props.doc2.ids}
          docKey="doc2"
          idImageMap={props.doc2.idImageMap}
          docTextArray={arrayFromState(props.doc2, 'idTextMap')}
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
