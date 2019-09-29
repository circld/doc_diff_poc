import React, { useState, useEffect } from 'react';

import classes from './Collapse.module.css';

const Collapse = props => {
  const [showing, setShow] = useState(true);

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <div className="panel-group">
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className={[classes.ToggleBar].join(' ')}
            onClick={() => setShow(!showing)}
          >{ showing ? 'Hide Files' : 'Show Files' }
          </div>
        </div>
        <div>
          {showing ? props.children : null}
        </div>
      </div>
    </div>
  )
};

export default Collapse;