import {
  CREATE_SAFETY_RECORD_CATEGORY_ATTEMPT,
  CREATE_SAFETY_RECORD_CATEGORY_SUCCESS,
  CREATE_SAFETY_RECORD_CATEGORY_FAIL,
} from '../ActionTypes';

const initialState = {
  loading: false,
  error: false,
  errorMessage: '',
  success: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SAFETY_RECORD_CATEGORY_ATTEMPT: {
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
        success: false,
      };
    }
    case CREATE_SAFETY_RECORD_CATEGORY_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: '',
        success: true,
      };
    }
    case CREATE_SAFETY_RECORD_CATEGORY_FAIL: {
      const { message } = action.payload;
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: message,
        success: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
