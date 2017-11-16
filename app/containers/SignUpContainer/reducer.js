import { fromJS } from 'immutable';
import Constants from './constants';

const initialState = fromJS({
  signUpForm: {},
  error: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  },
});

function signUpContainerReducer(state = initialState, action) {
  const oldState = state.toJS();
  switch (action.type) {
    case Constants.SIGNUP_FORM_CHANGED:
      return state.merge({
        signUpForm: {
          ...oldState.signUpForm,
          [action.inputName]: action.inputValue,
        },
      });
    case Constants.SIGNUP_FAILURE:
      return state.merge({
        error: action.error,
      });
    default:
      return state;
  }
}
export default signUpContainerReducer;
