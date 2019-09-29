import React from 'react';

import classes from './ImgThumbnail.module.css';
import phImg from '../../assets/images/imgPlaceholder.svg';


const imgThumbnail = props => {

  let image = <img className={classes.Image} src={phImg} alt="placeholder"/>;
  if (props.image && props.image.startsWith('data:image/png;base64')) {
    image = <img className={classes.Image} src={props.image} alt="submitted document"/>;
  }

  return(
    <div className={classes.ImgContainer}>
      {image}
      <button
        className={classes.CloseButton}
        onClick={props.removeFromState}
      >
        X
      </button>
    </div>
    )

};

export default imgThumbnail;
