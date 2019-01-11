var tesseract = require('./node_modules/tesseract.js');
let longImage = './much_longer.png';
let shortImage = './test.png';

// first image
tesseract.recognize(longImage)
  .then(e => console.log('first image'))
  .then(result => console.log(result.text))
;

// second image
tesseract.recognize(shortImage)
  .then(e => console.log('second image'))
  .then(result => console.log(result.text))
  .finally(e => tesseract.terminate())
;
