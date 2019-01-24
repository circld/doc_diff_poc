Document differ proof-of-concept

----------------------

### TODO

- [x] create bare bones node script to extract text from image using `tesseract`
- [ ] extend `test.js` such that it prints diffs between two images to console (`diff-match-patch`)
- [ ] POC single page react app allowing user to upload 2 images and displaying diff in browser
- [ ] Dream: upload (and drag-and-drop rearrange) multiple pages for before/after with pretty-printed diff (e.g., github style diff)

### Installation

- `$ git clone https://github.com/circld/doc_diff_poc.git`
- `$ brew install tesseract`
- `$ cd doc_diff_poc && npm install`
