import { select, takeLatest, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import firebase from '../../utils/firebase';

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
    yield put(loginActions.success(user));
    localStorage.setItem('user', JSON.stringify(user));
    yield put(push('/mainPage'));
  } catch (error) {
    yield put(loginActions.failure({ serverError: error.message }));
  }
}

export function* userBacktologinPage() {
  try {
    // eslint-disable-next-line
    let user = localStorage.getItem('user', user);
    if (user) {
      yield put(push('/mainPage'));
    }
    if (!user) {
      yield put(push('/'));
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
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in. By using
  // `takeLatest` only the result of the latest API call is applied. It returns
  // task descriptor (just like fork) so we can continue execution It will be
  // cancelled automatically on component unmount
  yield [takeLatest(types.LOGIN_REQUEST, loginRequestSaga)];
  yield [takeLatest(types.ON_PAGE_LOADED, userBacktologinPage)];
}
