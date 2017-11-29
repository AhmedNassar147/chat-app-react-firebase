import Constants from './constants';
import { constants } from 'os';

export default {
  onMainPageLoaded: () => ({ type: Constants.MAIN_PAGE_LOADED }),
  RquestRetreiveUsers: () => ({
    type: Constants.REQUEST_RETREIVE_USERS,
  }),
  UsersReceived: (usersFromDataBase) => ({
    type: Constants.USERS_RECEIVED,
    usersFromDataBase,
  }),
  UserNotReceived: (error) => ({
    type: Constants.USERS_NOT_RECEIVED,
    error,
  }),
  LoadingSuccess: ({ user }) => ({
    type: Constants.LOADING_PAGE_SUCCESS,
    user,
  }),
  LoadingFailure: ({ error }) => ({
    type: Constants.LOADING_PAGE_FAILURE,
    error,
  }),
  SignOutRequest: () => ({
    type: Constants.SIGNOUT_REQUEST,
  }),
  RequestGetUser: (uid) => ({
    type: Constants.REQUEST_GET_USER,
    uid,
  }),
  userReceived: (user) => ({
    type: Constants.USER_RECEIVED,
    user,
  }),
  userNotReceived: (error) => ({
    type: Constants.USER_NOT_RECEIVED,
    error,
  }),
  OnUpdateUserInfoChanged: ({ inputName, inputValue }) => ({
    type: Constants.UPDATE_USER_INFO_INPUT_CHANGED,
    inputName,
    inputValue,
  }),
  RequestUpdateUserStatus: (userId) => ({
    type: Constants.REQUEST_UPDATE_USER_STATUS,
    userId,
  }),
  userStatusDidupdate: (userStatus) => ({
    type: Constants.USER_STATUS_DID_UPDATED,
    userStatus,
  }),

  messageInputChaneged: ({ inputName, inputValue }) => ({
    type: Constants.INPUT_MESSAGE_CHANGED,
    inputName,
    inputValue,
  }),
  requestSendMesage: (selectedUserId, msg) => ({
    type: Constants.REQUEST_SEND_MESSAGE,
    selectedUserId,
    msg,
  }),
  requestRetreiveMessages: (currentUserId, selectedUserId) => ({
    type: Constants.REQUEST_RETREIVE_MESSAGES,
    currentUserId,
    selectedUserId,
  }),

  messageRetreivedSuccuss: (messages) => ({
    type: Constants.MESSAGE_RETREIVED_SUCCESS,
    messages,
  }),
  messageRetreivedFailure: () => ({
    type: Constants.MESSAGE_RETREIVED_FAILURE,
  }),
};
