import {
  USER_PROFILE_UPDATE_ATTEMPT,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,

  USER_AUTH_LOGOUT,
} from '../ActionTypes';
import { sessionTimeout } from '../../../../../Routing/Store/Actions';
import { AuthenticatedFetch } from '../../../../../Util/fetch';
import { dashboardLoading, showDashBoardError, showDashBoardSuccess } from '../../../../../Layouts/Dashboard/Store/Actions';

const updateUserAttempt = () => ({
  type: USER_PROFILE_UPDATE_ATTEMPT,
});

const updateUserSuccess = item => ({
  type: USER_PROFILE_UPDATE_SUCCESS,
  payload: {
    item,
  },
});

const updateUserFail = message => ({
  type: USER_PROFILE_UPDATE_FAIL,
  payload: { message },
});

export const updateUser = user => async (dispatch) => {
  try {
    //  Tell the layout we are doing something
    dispatch(dashboardLoading());
    dispatch(updateUserAttempt());
    const body = user;
    //  TODO - fetch these
    const { REACT_APP_API_URL } = process.env;
    const url = `${REACT_APP_API_URL}/profile/update`;
    const updatedItem = await AuthenticatedFetch(url, body);
    //  Display success message
    dispatch(showDashBoardSuccess('Profile Updated'));
    return dispatch(updateUserSuccess(updatedItem));
  } catch (_err) {
    if (_err.code === 401) return dispatch(sessionTimeout());
    //  Display error message
    dispatch(showDashBoardError(_err.message));
    return dispatch(updateUserFail(_err.message));
  }
};

const logout = () => ({ type: USER_AUTH_LOGOUT });
export const userLogout = () => async dispatch => dispatch(logout());
