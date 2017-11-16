import { fromJS } from 'immutable';
import types from './constants';

// The initial state of the App
const initialState = fromJS({
  form: {},
  error: {
    exist: false,
    username: '',
    password: '',
  },
});

function LoginReducer(state = initialState, action) {
  const oldState = state.toJS();
  switch (action.type) {
    case types.LOGIN_FORM_CHANGED:
      return state.merge({
        form: {
          ...oldState.form,
          [action.inputName]: action.value,
        },
      });
    case types.LOGIN_FAILURE:
      return state.merge({
        error: { ...action.error, exist: true },
      });
    case types.CLOSE_MODAL:
      return state.merge({
        error: {
          exist: false,
        },
      });
    default:
      return state;
  }
}

export default LoginReducer;
