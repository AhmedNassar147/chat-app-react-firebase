import { fromJS } from 'immutable';
import mainConstants, { DEFAULT_ACTION } from './constants';

const initialState = fromJS({
  updateUserStatusInputChanged: {},
  userStatusUpdated: {},
  messageinputvalueChanged: {},
});

function mainPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case mainConstants.UPDATE_USER_INFO_INPUT_CHANGED:
      return state.merge({
        updateUserStatusInputChanged: {
          [action.inputName]: action.inputValue,
        },
      });
    case mainConstants.USER_STATUS_DID_UPDATED:
      return state.merge({
        userStatusUpdated: action.userStatus,
      });
    case mainConstants.INPUT_MESSAGE_CHANGED:
      return state.merge({
        messageinputvalueChanged: {
          [action.inputName]: action.inputValue,
        },
      });
    default:
      return state;
  }
}

export default mainPageReducer;
