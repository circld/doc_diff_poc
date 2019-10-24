import * as actionTypes from './actionTypes';
import diff_match_patch from 'diff-match-patch';

export const diffStarted = () => {
  return {
    type: actionTypes.DIFF_START
  }
};

export const diffSuccess = (data) => {
  return {
    type: actionTypes.DIFF_SUCCESS,
    diffData: data
  }
};

export const diffFailure = (error) => {
  return {
    type: actionTypes.DIFF_FAILURE,
    error: error
  }
};

export const diffText = (text1, text2) => {
  return async dispatch => {
    dispatch(diffStarted())
    const dmp = new diff_match_patch();
    const diff = dmp.diff_main(text1, text2);
    dmp.diff_cleanupSemantic(diff);
    const html = dmp.diff_prettyHtml(diff);
    try {
      dispatch(diffSuccess(html));
    } catch (e) {
      console.log(e);
      dispatch(diffFailure(e.message));
    }
  }
}
