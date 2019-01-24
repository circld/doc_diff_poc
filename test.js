var tesseract = require('./node_modules/tesseract.js');
let oscarGood = './OscarGood.png';
let oscarBad = './OscarBad.png';
let diff_match_patch = require('./node_modules/diff-match-patch/index.js');

let goodText = 'goodText text';
let badText = 'badText text';
let dmp = new diff_match_patch();

tesseract.recognize(oscarGood)
  .then(e => console.log('first image'))
  .then(result => {
    goodText = result.text;
  })
;

tesseract.recognize(oscarBad)
  .then(e => console.log('second image'))
  .then(result => {
    badText = result.text;
  })
  .finally(e => {
    // example from: https://neil.fraser.name/software/diff_match_patch/demos/diff.html
    let diff = dmp.diff_main(goodText, badText);
    dmp.diff_cleanupSemantic(diff);
    console.log(dmp.diff_prettyHtml(diff));

    tesseract.terminate()
  })
;
