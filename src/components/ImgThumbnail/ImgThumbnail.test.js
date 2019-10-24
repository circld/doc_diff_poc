import React from 'react';
import ImgThumbnail from './ImgThumbnail';
import renderer from 'react-test-renderer';

test('ImgThumbnail given valid image renders the image in the thumbnail', () => {
  const component = renderer.create(
    <ImgThumbnail image={'data:image___this_is_base64_and_an_image'}/>,
  );

  // TODO grab the image `src` to ensure it's actually the image passed in (if
  // valid)
  // https://reactjs.org/docs/test-renderer.html
  let testInstance = component.root;
  expect(testInstance.findByType(ImgThumbnail).props.image).toMatch(/data:image___this_is_base64_and_an_image/);
});


// TODO
// test('ImgThumbnail given invalid image renders the placeholder image in the thumbnail')
