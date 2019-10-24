import * as diffing from './diffing';
import * as actionTypes from './actionTypes';

test('diffStarted returns an object with the DIFF_START action type', () => {
  expect(diffing.diffStarted()).toStrictEqual({ type: actionTypes.DIFF_START });
});

test('diffSuccess returns an object with the DIFF_START action type', () => {
  expect(diffing.diffSuccess('a'))
    .toStrictEqual({
      type: actionTypes.DIFF_SUCCESS, diffData: 'a'
    });
});

test('diffFailure returns an object with the DIFF_START action type', () => {
  expect(diffing.diffFailure('poop'))
    .toStrictEqual({
      type: actionTypes.DIFF_FAILURE, error: 'poop'
    });
});
