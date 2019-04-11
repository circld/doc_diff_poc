import React from 'react';

import classes from './ImgThumbnail.module.css';


const imgThumbnail = props => {


  return(
    <div className={classes.ImgContainer}>
      <img className={classes.Image} src={props.image} alt="?"/>
    </div>
    )

};

export default imgThumbnail;
