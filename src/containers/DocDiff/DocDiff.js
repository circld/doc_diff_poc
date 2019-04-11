import React, { Component } from 'react';

import diff_match_patch from 'diff-match-patch/index.js';
import DocManager from '../../components/DocManager/DocManager';

const tesseract = window.Tesseract;  // imported in index.html (required for client side execution)

class DocDiff extends Component {

  state = {
    imgs1: [],
    imgs2: [],
    texts1: [],
    texts2: [],

    // TODO: this state is for legacy
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
      // this.setState({ [stateKey]: reader.result });
      this.addImage(reader.result, stateKey)
    };
    reader.readAsDataURL(input.files[0]);
  };

  addImage = (image, stateKey) => {
    this.setState(prevState => {
      const imgsCopy = [...prevState[stateKey]];
      imgsCopy.push(image);
      return {
        [stateKey]: imgsCopy
      }
    })
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
      <div className="container my-5">
        <div className="row">
          <DocManager
            className="col-sm-6"
            imgArray={this.state.imgs1}
            docText={this.state.texts1}
          />
          <DocManager
            className="col-sm-6"
            imgArray={this.state.imgs2}
            docText={this.state.texts2}
          />
        </div>
        <div className="row">
          <input type="file" onChange={(e) => this.readFile(e, 'imgs1')}/>

          <input type="file" onChange={(e) => this.readFile(e, 'imgs2')}/>
          <button className="btn btn-secondary" onClick={() => this.getTextFromImages(this.state.file1, this.state.file2)}>GO!</button>
          <div dangerouslySetInnerHTML={{ __html: diffHtml }} />
        </div>
      </div>
    );
  };
}



export default DocDiff;