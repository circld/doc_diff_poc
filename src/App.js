import React, { Component } from 'react';
import diff_match_patch from '../node_modules/diff-match-patch/index.js';

const tesseract = window.Tesseract;  // imported in index.html (required for client side execution)






class App extends Component {

  state = {
    file1: null,
    file2: null,
    img1Text: null,
    img2Text: null
  };

  textFromImg = (image, stateKey) => {
    this.setState({ [stateKey]: null });
    tesseract.recognize(image)
      .then(result => {
        this.setState({ [stateKey]: result.text });
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

  readFile = (event, stateKey) => {
    const input = event.target;

    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ [stateKey]: reader.result });
    };
    reader.readAsDataURL(input.files[0]);
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
        <input type="file" onChange={(e) => this.readFile(e, 'file1')}/>
        <input type="file" onChange={(e) => this.readFile(e, 'file2')}/>
        <button onClick={() => this.getTextFromImages(this.state.file1, this.state.file2)}>GO!</button>
        <div dangerouslySetInnerHTML={{ __html: diffHtml }} />
      </React.Fragment>
    );
  };

}

export default App;
