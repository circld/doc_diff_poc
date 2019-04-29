import React from 'react';

import ImgThumbnail from '../ImgThumbnail/ImgThumbnail';

const imgGroup = props => {

  return (
    <div className="row">
      {props.imgArray.map((image, index) => {
        return (
          <ImgThumbnail image={image} key={index}/>
        )
      })}
    </div>
  )
};


export default imgGroup;