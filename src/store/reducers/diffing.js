import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: false,
  data: null
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.DIFF_START:
      return {
        ...state,
        loading: true,
        error: false,
        data: null
      };

    case actionTypes.DIFF_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.diffData
      }

    case actionTypes.DIFF_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: null
      }

    default:
      return state;
  }
}

export default reducer;
