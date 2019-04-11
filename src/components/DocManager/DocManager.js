import React from 'react';

import ImgGroup from '../ImgGroup/ImgGroup';
import ImgTextDisplay from '../ImgTextDisplay/ImgTextDisplay';


const docManager = props => {

  return (
    <div className={props.className}>
      <ImgGroup
        imgArray={props.imgArray}
      />
      <ImgTextDisplay
        docText={props.docText}
      />
    </div>
  );
};


export default docManager;