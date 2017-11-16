/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import constants from '../../containers/HomePage/constants';
import signUpConstants from '../../containers/SignUpContainer/constants';
import mainConstants from '../../containers/MainPage/constants';

// The initial state of the App
const initialState = fromJS({ loading: false, error: false, userData: {} });

function appReducer(state = initialState, action) {
  switch (action.type) {
    case constants.LOGIN_SUCCESS:
    case signUpConstants.SIGNUP_SUCCESS:
    case mainConstants.LOADING_PAGE_SUCCESS:
      return state.merge({ userData: action.user });
    case mainConstants.LOADING_PAGE_FAILURE:
      return state.merge({ error: action.error });
    default:
      return state;
  }
}

export default appReducer;
