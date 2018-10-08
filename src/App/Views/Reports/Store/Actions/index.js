import {
  LIST_REPORT_ATTEMPT,
  LIST_REPORT_SUCCESS,
  LIST_REPORT_FAIL,
} from '../ActionTypes';
import { sessionTimeout } from '../../../../Routing/Store/Actions';
import { AuthenticatedFetch } from '../../../../Util/fetch';

const listReportAttempt = () => ({
  type: LIST_REPORT_ATTEMPT,
});

const listReportSuccess = response => ({
  type: LIST_REPORT_SUCCESS,
  payload: {
    response,
  },
});

const listReportFail = message => ({
  type: LIST_REPORT_FAIL,
  payload: { message },
});

export const listReports = () => async (dispatch) => {
  try {
    dispatch(listReportAttempt());
    const body = {};
    //  TODO - fetch these
    const { REACT_APP_API_URL, REACT_APP_LIST_REPORT_PATH } = process.env;
    const response = await AuthenticatedFetch(`${REACT_APP_API_URL}${REACT_APP_LIST_REPORT_PATH}`, body);
    return dispatch(listReportSuccess(response));
  } catch (_err) {
    if (_err.code === 401) return dispatch(sessionTimeout());
    return dispatch(listReportFail(_err.message));
  }
};

//  TODO: Remove me
export const a = () => {};