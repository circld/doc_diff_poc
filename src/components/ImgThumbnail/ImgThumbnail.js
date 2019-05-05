import React from 'react';

import classes from './ImgThumbnail.module.css';
import phImg from '../../assets/images/imgPlaceholder.svg';


const imgThumbnail = props => {

  let image = <img className={classes.Image} src={phImg} alt="placeholder"/>;
  if (props.image.startsWith('data:image/png;base64')) {
    image = <img className={classes.Image} src={props.image} alt="submitted document"/>;
  }

  return(
    <div className={classes.ImgContainer}>
      {/*<img className={classes.Image} src={phImg} alt="placeholder image"/>;*/}
      {image}
      <button
        className={classes.CloseButton}
        onClick={props.onRemoveImage}
      >
        X
      </button>
    </div>
    )

};

export default imgThumbnail;
