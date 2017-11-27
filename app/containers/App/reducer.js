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

import constants from '../../containers/LoginPage/constants';
import signUpConstants from '../../containers/SignUpContainer/constants';
import mainConstants from '../../containers/MainPage/constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  userData: {},
  usersFromDatabase: [],
  getUserinfo: {},
  messageRetreivedSuccess: [],
  messageRetreivedFailure: [],
});
function appReducer(state = initialState, action) {
  // const oldState = state.JS();
  switch (action.type) {
    case constants.LOGIN_SUCCESS:
    case signUpConstants.SIGNUP_SUCCESS:
    case mainConstants.LOADING_PAGE_SUCCESS:
      return state.merge({
        userData: action.user,
      });

    case mainConstants.LOADING_PAGE_FAILURE:
      return state.merge({ error: action.error });

    case mainConstants.USERS_RECEIVED:
      return state.merge({
        usersFromDatabase: action.usersFromDataBase,
      });

    case mainConstants.USER_RECEIVED:
      return state.merge({
        getUserinfo: action.user,
      });

    case mainConstants.MESSAGE_RETREIVED_SUCCESS:
      return state.merge({
        messageRetreivedSuccess: action.messages,
      });

    case mainConstants.MESSAGE_RETREIVED_FAILURE:
      return state.merge({
        messageRetreivedFailure: action.error,
      });

    default:
      return state;
  }
}

export default appReducer;
