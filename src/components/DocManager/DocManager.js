import React from 'react';

import ImgGroup from '../ImgGroup/ImgGroup';
import ImgTextDisplay from '../ImgTextDisplay/ImgTextDisplay';


const docManager = props => {

  return (
    <div className={props.className}>
      <ImgGroup
        docKey={props.docKey}
      />
      <ImgTextDisplay
        docTextArray={props.docTextArray}
      />
    </div>
  );
};


export default docManager;
