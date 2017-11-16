import Constants from './constants';

export default {
  onMainPageLoaded: () => ({ type: Constants.MAIN_PAGE_LOADED }),
  LoadingSuccess: ({ user }) => ({
    type: Constants.LOADING_PAGE_SUCCESS,
    user,
  }),
  LoadingFailure: ({ error }) => ({
    type: Constants.LOADING_PAGE_FAILURE,
    error,
  }),
  SignOut: () => ({
    type: Constants.SIGN_OUT,
  }),
};
