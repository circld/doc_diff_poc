import React from 'react';

const diffManager = props => {

  if (props.loading) {
    return 'loading';
  }

  if (props.error) {
    return 'error';
  }

  if (props.data) {
    return <div dangerouslySetInnerHTML={{
          __html: props.data
         }} />
  }

  return null;
};

export default diffManager;
