import { put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import MainActions from './actions';
import MainConstants from './constants';
import { database } from '../../utils/firebase';
import mapObject from '../../utils/transformObjectIntoArray';

export function* LoadinPageSaga() {
  try {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      yield put(MainActions.LoadingFailure('User Not Found'));
      yield put(push('/'));
      return;
    }
    if (userData) {
      yield put(MainActions.LoadingSuccess({ user: userData }));
      yield put(push('/mainPage'));
    }
  } catch (error) {
    yield put(MainActions.LoadingFailure(error));
    yield put(push('/'));
  }
}

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

export function* SignOutRequestSaga() {
  try {
    localStorage.removeItem('user');
    yield put(push('/'));
  } catch (error) {
    yield put(push('/'));
  }
}

export function* RequestGetUserSaga(action) {
  try {
    const getuser = yield database.ref(`/Users/${action.uid}`).once('value');
    yield put(MainActions.userReceived(getuser.val()));
  } catch (error) {
    yield put(MainActions.userNotReceived(error));
  }
}

const formSelector = (state) => state.get('mainPage').toJS();

export function* RequestUpdateUserStatusSaga(userId) {
  try {
    const { updateUserStatusInputChanged } = yield select(formSelector);
    goUpdateUserStatus(userId, updateUserStatusInputChanged.aboutUser);
    yield put(
      MainActions.userStatusDidupdate(updateUserStatusInputChanged.aboutUser)
    );
  } catch (error) {
    yield put(MainActions.userStatusDidotUpdate(error));
  }
}
const goUpdateUserStatus = async (action, userStatus) => {
  try {
    database.ref(`/Users/${action.userId}/userStatus/`).set(userStatus);
  } catch (error) {
    MainActions.userStatusDidotUpdate(error);
  }
};
export default function* defaultSaga() {
  yield [takeLatest(MainConstants.MAIN_PAGE_LOADED, LoadinPageSaga)];
  yield [takeLatest(MainConstants.SIGNOUT_REQUEST, SignOutRequestSaga)];
  yield [takeLatest(MainConstants.REQUEST_GET_USER, RequestGetUserSaga)];
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
