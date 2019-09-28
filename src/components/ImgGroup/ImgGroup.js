import React from 'react';
import { connect } from 'react-redux';

import ImgThumbnail from '../ImgThumbnail/ImgThumbnail';
import * as actions from '../../store/actions/index';

const ImgGroup = props => {

  return (
    <div className="row">
      {props.ids.map(id => (
          <ImgThumbnail
            key={id}
            docKey={props.docKey}
            image={props.idImageMap[id]}
            removeFromState={() => props.removeFromState(id, props.docKey)}
          />
        ))
      }
    </div>
  )
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromState: (id, docKey) => dispatch(actions.removeFromState(id, docKey))
  };
};

export default connect(null, mapDispatchToProps)(ImgGroup);
