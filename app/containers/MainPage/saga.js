import { put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import MainActions from './actions';
import MainConstants from './constants';
import { database } from '../../utils/firebase';
import mapObject from '../../utils/transformObjectIntoArray';
import getChatId from '../../utils/chatIdHelper';
import { makeSelectMessageInput } from './selectors';
import { makeSelectCurrentUser } from '../App/selectors';

// for check if there is user in localStorage to get in mainPage
export function* LoadingPageSaga() {
  try {
    const user = localStorage.getItem('user');
    if (!user) {
      yield put(MainActions.LoadingFailure('User Not Found'));
      yield put(push('/'));
    }
    if (user) {
      yield put(MainActions.LoadingSuccess({ user }));
    }
  } catch (error) {
    yield put(MainActions.LoadingFailure(error));
  }
}
// for retreive the all users to  mainPage when it load
export function* RetreiveUserfromDatabase() {
  try {
    const users = yield database.ref('/Users').once('value');
    const usersArray = [];
    mapObject(users.val())((user) => usersArray.push(user));
    yield put(MainActions.UsersReceived(usersArray));
  } catch (error) {
    yield put(MainActions.UserNotReceived(error));
  }
}

// if signout button clicked func go get user from localStoraga and delete is
export function* SignOutRequestSaga() {
  try {
    localStorage.removeItem('user');
    yield put(push('/'));
  } catch (error) {
    return false;
  }
}

// requset to get current user
export function* RequestGetUserSaga(action) {
  try {
    const getuser = yield database.ref(`/Users/${action.uid}`).once('value');
    yield put(MainActions.userReceived(getuser.val()));
  } catch (error) {
    yield put(MainActions.userNotReceived(error));
  }
}

// to requst the server and execute async func for update the user status
export function* RequestUpdateUserStatusSaga(userId) {
  try {
    const formSelector = (state) => state.get('mainPage').toJS();
    const { updateUserStatusInputChanged } = yield select(formSelector);
    goUpdateUserStatus(userId, updateUserStatusInputChanged.aboutUser);
    yield put(
      MainActions.userStatusDidupdate(updateUserStatusInputChanged.aboutUser)
    );
  } catch (error) {
    yield put(MainActions.userStatusDidotUpdate(error));
  }
}

// async func to update the user status
const goUpdateUserStatus = async (action, userStatus) => {
  try {
    database.ref(`/Users/${action.userId}/userStatus`).set(userStatus);
  } catch (error) {
    MainActions.userStatusDidotUpdate(error);
  }
};

// for select the message from state
const selectMessage = (message) => message.toJS();
// for select the current user from state
const selectUser = (substate) => substate.js();
// requst send message to firebase realtime database
export function* requestSendMessage({ userInfoId }) {
  const messageInput = yield select(makeSelectMessageInput(selectMessage));
  const { message } = messageInput.toJS();
  let user = yield select(makeSelectCurrentUser(selectUser));
  user = JSON.parse(user);
  const chatId = getChatId(user.id, userInfoId);
  database
    .ref()
    .child(`Chats/${chatId}`)
    .push({ senderId: user.id, message, date: Date.now() });
}

export default function* defaultSaga() {
  yield [takeLatest(MainConstants.MAIN_PAGE_LOADED, LoadingPageSaga)];
  yield [takeLatest(MainConstants.SIGNOUT_REQUEST, SignOutRequestSaga)];
  yield [takeLatest(MainConstants.REQUEST_GET_USER, RequestGetUserSaga)];
  yield [takeLatest(MainConstants.REQUEST_SEND_MESSAGE, requestSendMessage)];
  yield [
    takeLatest(
      MainConstants.REQUEST_UPDATE_USER_STATUS,
      RequestUpdateUserStatusSaga
    ),
  ];
  yield [
    takeLatest(MainConstants.REQUEST_RETREIVE_USERS, RetreiveUserfromDatabase),
  ];
}
