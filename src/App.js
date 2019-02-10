import React, { Component } from 'react';
import tesseract from '../node_modules/tesseract.js';
import diff_match_patch from '../node_modules/diff-match-patch/index.js';

import OscarBad from './assets/images/OscarGood.png';
import OscarGood from './assets/images/OscarBad.png'


class App extends Component {

  makeDiffHtml = (img1, img2) => {

    let oscarGoodPath = './assets/images/OscarGood.png';
    let oscarBadPath = './assets/images/OscarBad.png';

    let promise1 = new Promise(function (resolve, reject) {

      let goodText = null;
      let badText = null;
      let dmp = new diff_match_patch();

      tesseract.recognize(OscarBad)
        .then(e => console.log('first image'))
        .then(result => {
          goodText = result.text;
        })
      ;

      tesseract.recognize(OscarGood)
        .then(e => console.log('second image'))
        .then(result => {
          badText = result.text;
        })
        .finally(e => {
          // example from: https://neil.fraser.name/software/diff_match_patch/demos/diff.html
          let diff = dmp.diff_main(goodText, badText);
          dmp.diff_cleanupSemantic(diff);
          resolve(dmp.diff_prettyHtml(diff));

          tesseract.terminate()
        });
      });
    return promise1;
  };

     // async thing;
     // resolve(async_thing_value);
  returnDiffVal = () => {
    this.makeDiffHtml().then(function(value) {
      console.log(value);
      // expected output: "foo"
    });
  };

  render() {

    return (
      <React.Fragment>
        <h1>This is the App component</h1>
        <img src={OscarBad} />
        <img src={OscarGood} />
        <button onClick={() => this.returnDiffVal()}>GO!</button>
      </React.Fragment>
    );
  };

}

export default App;
