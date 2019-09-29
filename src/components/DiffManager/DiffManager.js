import React from 'react';

import Spinner from '../../components/UI/Spinner/Spinner';

const diffManager = props => {

  if (props.loading) {
    return <Spinner/>;
  }

  if (props.error) {
    return 'error';
  }

  if (props.data) {
    return (
      <div dangerouslySetInnerHTML={{
        __html: props.data
      }} />
    );
  }

  return null;
};

export default diffManager;
