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
  };

  spliceImgIntoArray = (idx, docKey, image) => {
    this.setState(prevState => {
      const imgsCopy = [...prevState[docKey].imgs];
      imgsCopy.splice(idx, 1, image);
      return {
        [docKey]: {
          ...prevState[docKey],
          imgs: imgsCopy
        }
      }
    });
    return {idx, docKey, image};
  };

  readFile = (idx, docKey, file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const image = reader.result;
        resolve({idx, docKey, image});
      };
      reader.readAsDataURL(file);
    })
  };

  textFromImg = (idx, docKey, image) => {
    tesseract.recognize(image)
      .then(result => {
        this.setState(prevState => {
          const imgsTextCopy = [...prevState[docKey].imgsText];
          imgsTextCopy.splice(idx, 1, result.text);
          return {
            [docKey]: {
              ...prevState[docKey],
              imgsText: imgsTextCopy
            }
          };
        });
      });
  };

  processImage = (event, docKey) => {
    const input = event.target;
    const file =  input.files[0];
    let idx = null;
    new Promise((resolve, reject) => {
      this.setState( (prevState) => {
        idx = prevState[docKey].imgsFileName.length;
        return {[docKey]: this.incrementStateArrays(prevState[docKey], file.name)};
      },
        // setState takes a callback as a second argument.
        // This callback will be executed after state has been updated by React.
        // We use it order to guarantee that the placeholder indexes are set,
        // and that `idx` is not undefined.
        () => resolve({idx, docKey, file}));
        // Call resolve with an object as the only argument.
        // Promises only respect the first argument passed to the `resolve`
        // callback so we must only pass a single argument.
        // Combining the arguments in an object lets us take advantage of object destructuring.
        //   e.g. {idx: idx, docKey: docKey, file: file}
        // (see https://stackoverflow.com/questions/22773920/can-promises-have-multiple-arguments-to-onfulfilled)
    })
      // Because we are destructuring an object to get multiple arguments,
      // the object accepted in the anonymous function passed to `.then`
      // must have the same keys as the object passed to `resolve` in the preceding promise,
      // otherwise the key/argument will be undefined.
      .then(({idx, docKey, file}) => this.readFile(idx, docKey, file))
      .then(({idx, docKey, image}) => this.spliceImgIntoArray(idx, docKey, image))
      .then(({idx, docKey, image}) => this.textFromImg(idx, docKey, image))

    // TODO get minimal promise example working [done AKJ 2019-04-27]
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    // Promise(load_img(idx)).then((idx) => extract_text(idx))
  };

  render() {

    let diffHtml = null;
    if (this.state.img1Text && this.state.img2Text) {
      let rawHtml = null;
      rawHtml = this.diffText(this.state.img1Text, this.state.img2Text);
      diffHtml = rawHtml;
    }

    return (
      <div className="container my-5">
        <div className="row">
          <input type="file" onChange={(e) => this.processImage(e, 'doc1')}/>
          <input type="file" onChange={(e) => this.processImage(e, 'doc2')}/>
          {/*TODO: the onClick callback for the following button does not exist */}
          <button className="btn btn-secondary" onClick={() => this.getTextFromImages(this.state.file1, this.state.file2)}>GO!</button>
          <div dangerouslySetInnerHTML={{ __html: diffHtml }} />
        </div>
        <div className="row">
          <DocManager
            className="col-sm-6"
            imgArray={this.state.doc1.imgs}
            docTextArray={this.state.doc1.imgsText}
          />
          <DocManager
            className="col-sm-6"
            imgArray={this.state.doc2.imgs}
            docTextArray={this.state.doc2.imgsText}
          />
        </div>
      </div>
    );
  };
}


export default DocDiff;
