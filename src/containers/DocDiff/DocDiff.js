import React, { Component } from 'react';

import diff_match_patch from 'diff-match-patch/index.js';
import DocManager from '../../components/DocManager/DocManager';

const tesseract = window.Tesseract;  // imported in index.html (required for client side execution)

class DocDiff extends Component {

  state = {
    doc1: {
      imgsFileName: [],
      imgs: [],
      imgsText: []
    },
    doc2: {
      imgsFileName: [],
      imgs: [],
      imgsText: []
    }
  };

  incrementStateArrays = (prevState, filename) => {
    const files = [...prevState.imgsFileName];
    files.push(filename);
    const images = [...prevState.imgs];
    images.push(filename);
    const text = [...prevState.imgsText];
    text.push(filename);
    return {
      imgsFileName: files,
      imgs: images,
      imgsText: text
    }
  }

  processImage = (event, docKey) => {
    const input = event.target;
    const filename = input.files[0];
    let idx = null;
    this.setState( (prevState) => {
      idx = prevState[docKey].imgsFileName.length;
      return {[docKey]: this.incrementStateArrays(prevState[docKey], filename)};
    } );

    // TODO get minimal promise example working
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    // Promise(load_img(idx)).then((idx) => extract_text(idx))
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
            docTextArray={this.state.texts1}
          />
          <DocManager
            className="col-sm-6"
            imgArray={this.state.imgs2}
            docTextArray={this.state.texts2}
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
