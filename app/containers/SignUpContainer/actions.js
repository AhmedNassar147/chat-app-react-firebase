import Constats from './constants';

export default {
  SignUpForm: ({ inputName, inputValue }) => ({
    type: Constats.SIGNUP_FORM_CHANGED,
    inputName,
    inputValue,
  }),

  SignUpRequest: () => ({
    type: Constats.SIGNUP_REQUEST,
  }),

  SignUpSuccess: ({ user }) => ({
    type: Constats.SIGNUP_SUCCESS,
    user,
  }),

  SignupFailure: (error) => ({
    type: Constats.SIGNUP_FAILURE,
    error,
  }),
  SignUploading: () => ({
    type: Constats.SIGN_UP_LOADING,
  }),
};
