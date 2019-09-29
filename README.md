Document differ proof-of-concept

----------------------

### TODO

- [x] create bare bones node script to extract text from image using `tesseract`
- [x] extend `test.js` such that it prints diffs between two images to console (`diff-match-patch`)
- [x] POC single page react app allowing user to select 2 images and displaying diff in browser
- [ ] extend the UX
    - [x] create mockup sketch
    - [x] design required components
    - [x] display img thumbnails
    - [x] preview text from images
    - [x] preview text updates on image change
    - [x] implement diffing functionality
    - [x] collapse preview text after diff generation
    - [ ] drag and drop rearrange images
- [ ] extend app to be able to handle PDF files
- [ ] write tests
- [ ] refactor to use TypeScript (just bc)
- [ ] make it not look like complete shite

### Installation

- `$ git clone https://github.com/circld/doc_diff_poc.git`
- `$ cd doc_diff_poc && npm install`
- `$ npm start`
