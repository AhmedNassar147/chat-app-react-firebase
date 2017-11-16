import { takeLatest, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import signUpTypes from './constants';
import signupActions from './actions';
import firebase from '../../utils/firebase';

const formSelector = (state) => state.get('signUpContainer').toJS();

export function* signUpRequestSaga() {
  try {
    const { signUpForm } = yield select(formSelector);
    const errors = validateUserInputs(signUpForm);
    if (Object.keys(errors).length > 0) {
      yield put(signupActions.SignupFailure(errors));
      return;
    }
    const user = yield firebase
      .auth()
      .createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
    yield user.updateProfile({
      displayName: user.firstName + user.lastName,
    });
    const updateUser = user.toJSON();
    localStorage.setItem('user', JSON.stringify(updateUser));
    yield put(signupActions.SignUpSuccess(updateUser));
    yield put(push('/mainPage'));
  } catch (error) {
    yield put(signupActions.SignupFailure(error));
  }
}

export function* SignUpLoadSaga() {
  try {
    // eslint-disable-next-line
    let existUser = localStorage.getItem('user');
    if (existUser) {
      yield put(push('/mainPage'));
      return;
    }
    if (!existUser) {
      yield put(push('/signup'));
    }
  } catch (error) {
    yield put(push('/signup'));
  }
}

function validateUserInputs({ email, firstName, lastName, password }) {
  // eslint-disable-next-line
  let errors = {};
  if (!email) {
    errors.email = 'email required';
  }
  if (!firstName) {
    errors.firstName = 'firstName required';
  }
  if (!lastName) {
    errors.lastName = 'lastName required';
  }
  if (!password) {
    errors.password = 'password required';
  }
  return errors;
}

export default function* defaultSaga() {
  yield [takeLatest(signUpTypes.SIGNUP_REQUEST, signUpRequestSaga)];
  yield [takeLatest(signUpTypes.SIGN_UP_LOADING, SignUpLoadSaga)];
}
