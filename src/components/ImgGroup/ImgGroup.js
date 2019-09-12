import React from 'react';

import ImgThumbnail from '../ImgThumbnail/ImgThumbnail';
import { useStateStore } from '../../store/stateHelpers';
import * as actionTypes from '../../store/actions/actionTypes';

const ImgGroup = props => {

  const [state, dispatch] = useStateStore();

  const onRemoveImage = id => {
    dispatch({
      type: actionTypes.REMOVE_ID_FROM_STATE,
      docKey: props.docKey,
      id: id
    })
  };

  return (
    <div className="row">
      {state[props.docKey].ids.map(id => (
          <ImgThumbnail
            key={id}
            image={state[props.docKey].imgs[id]}
            onRemoveImage={() => onRemoveImage(id)}
          />
        ))
      }
    </div>
  )
};


export default ImgGroup;
