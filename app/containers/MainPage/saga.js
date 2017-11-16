import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import MainActions from './actions';
import MainConstants from './constants';

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

export function* SiGnOutSaga() {
  try {
    localStorage.removeItem('user');
    yield put(push('/'));
  } catch (error) {
    console.log('user is not empty =>', error);
  }
}
export default function* defaultSaga() {
  yield [takeLatest(MainConstants.MAIN_PAGE_LOADED, LoadinPageSaga)];
  yield [takeLatest(MainConstants.SIGN_OUT, SiGnOutSaga)];
}
