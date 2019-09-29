import React from 'react';
import { connect } from 'react-redux';

import DiffManager from '../../components/DiffManager/DiffManager';
import DocManager from '../../components/DocManager/DocManager';
import * as actions from '../../store/actions/index';
import Collapse from '../../components/UI/Collapse/Collapse';

const DocDiff = props => {

  const arrayFromState = (docState, slice) => {
    return docState.ids.map(key => docState[slice][key]);
  };

  const fileFromEvent = event => {
    const input = event.target;
    return input.files[0];
  };

  const processDiff = event => {
    const text1 = arrayFromState(props.doc1, 'idTextMap').join('\n');
    const text2 = arrayFromState(props.doc2, 'idTextMap').join('\n');
    props.diffText(text1, text2);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <button
          onClick={processDiff}
        >DIFF IT</button>
      </div>
      <Collapse show={!props.diff.data}>
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
      </Collapse>
      <div className="row">
      <DiffManager
        loading={props.diff.loading}
        error={props.diff.error}
        data={props.diff.data}
      />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    doc1: state.docsReducer.doc1,
    doc2: state.docsReducer.doc2,
    diff: state.diffReducer,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    diffText: (text1, text2) => dispatch(actions.diffText(text1, text2)),
    processImage: (file, docKey) => dispatch(actions.processImage(file, docKey)),
    populateStateArrays: (id, docKey, val) => dispatch(actions.populateStateArrays(id, docKey, val)),
    valToState: (id, docKey, slice, val) => dispatch(actions.valToState(id, docKey, slice, val)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DocDiff);
