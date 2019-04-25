import React from 'react';


const textDiv = (text) => (
  <div>
    <pre>
      { text }
    </pre>
  </div>
);

const createTextBlocks = (textArray) => textArray.map(textDiv);

const imgTextDisplay = (props) => {

  return (
    <div>
    { props.docTextArray.length > 0 ? createTextBlocks(props.docTextArray) : 'No images added.' }
    </div>
  );
};


export default imgTextDisplay;
