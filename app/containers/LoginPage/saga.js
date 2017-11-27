import { select, takeLatest, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import firebase, { database } from '../../utils/firebase';

import types from './constants';
import loginActions from './actions';

const formSelector = (state) => state.get('login').toJS();

export function* loginRequestSaga() {
  try {
    const { form } = yield select(formSelector);
    const errors = validateInputs(form);
    if (Object.keys(errors).length > 0) {
      yield put(loginActions.failure(errors));
      return;
    }
    let user = yield firebase
      .auth()
      .signInWithEmailAndPassword(form.username, form.password);
    user = user.toJSON();
    const snapshot = yield database.ref(`/Users/${user.uid}`).once('value');
    const userData = snapshot.val();
    localStorage.setItem('user', JSON.stringify(userData));
    yield put(loginActions.success(userData));

    yield put(push('/mainPage'));
  } catch (error) {
    yield put(loginActions.failure({ serverError: error.message }));
  }
}

export function* userBacktologinPage() {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      yield put(push('/mainPage'));
    }
  } catch (error) {
    yield put(push('/'));
  }
}

function validateInputs({ username, password }) {
  // eslint-disable-next-line
  let errors = {};
  if (!username) {
    errors.username = 'Email is required';
  }
  if (!password) {
    errors.password = 'Password is required';
  }
  return errors;
}

export default function* githubData() {
  yield [takeLatest(types.LOGIN_REQUEST, loginRequestSaga)];
  yield [takeLatest(types.ON_PAGE_LOADED, userBacktologinPage)];
}
