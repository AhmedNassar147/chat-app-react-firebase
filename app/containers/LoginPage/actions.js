import types from '../LoginPage/constants';

export default {
  loginFormChanged: ({ inputName, value }) => ({
    type: types.LOGIN_FORM_CHANGED,
    inputName,
    value,
  }),
  request: () => ({
    type: types.LOGIN_REQUEST,
  }),
  success: (user) => ({
    type: types.LOGIN_SUCCESS,
    user,
  }),
  failure: (error) => ({
    type: types.LOGIN_FAILURE,
    error,
  }),
  closeModal: () => ({
    type: types.CLOSE_MODAL,
  }),
  loginpageloadWhenUserAleadyloged: () => ({
    type: types.ON_PAGE_LOADED,
  }),
};
