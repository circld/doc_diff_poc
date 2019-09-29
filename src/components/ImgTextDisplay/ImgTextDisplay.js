import React from 'react';

import Spinner from '../../components/UI/Spinner/Spinner';


const textDiv = (text, idx) => {
  if (text === null) {
    return <Spinner key={idx}/>;
  }
  return (
    <div key={idx}>
      <pre>
        { text }
      </pre>
    </div>
  );
};

const renderTextBlocks = (textArray) => {
  if (textArray.length === 0) {
    return 'No images added.'
  }
  return textArray.map(textDiv);
};

const imgTextDisplay = (props) => {

  return (
    <div>
      { renderTextBlocks(props.docTextArray)}
    </div>
  );
};


export default imgTextDisplay;
