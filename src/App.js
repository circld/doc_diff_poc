import React, { Component } from 'react';
// import tesseract from '../node_modules/tesseract.js';  // server side import
import diff_match_patch from '../node_modules/diff-match-patch/index.js';

import OscarBad from './assets/images/OscarGood.png';
import OscarGood from './assets/images/OscarBad.png'
const tesseract = window.Tesseract;  // imported in index.html (required for client side execution)


class App extends Component {

  state = {
    img1Text: null,
    img2Text: null
  };

  textFromImg = (image, stateKey) => {
    this.setState({[stateKey]: null});
    tesseract.recognize(image)
    .then(result => {
      this.setState({[stateKey]: result.text});
    })
  };

  getTextFromImages = (img1, img2) => {
    this.textFromImg(img1, 'img1Text');
    this.textFromImg(img2, 'img2Text');
  };

  diffText = (text1, text2) => {
    let dmp = new diff_match_patch();
    let diff = dmp.diff_main(text1, text2);
    dmp.diff_cleanupSemantic(diff);
    return dmp.diff_prettyHtml(diff);
  };

  render() {

    let diffHtml = null;
    if (this.state.img1Text && this.state.img2Text) {
      let rawHtml = null;
      rawHtml = this.diffText(this.state.img1Text, this.state.img2Text);
      console.log(rawHtml);
      diffHtml = rawHtml;
    }

    return (
      <React.Fragment>
        <h1>This is the App component</h1>
        <img src={OscarBad} />
        <img src={OscarGood} />
        <button onClick={() => this.getTextFromImages(OscarGood, OscarBad)}>GO!</button>
        <div dangerouslySetInnerHTML={{ __html: diffHtml}} />
      </React.Fragment>
    );
  };

}

export default App;
