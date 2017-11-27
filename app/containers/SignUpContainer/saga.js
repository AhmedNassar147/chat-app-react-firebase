import { takeLatest, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import signUpTypes from './constants';
import signupActions from './actions';
import firebase, { database } from '../../utils/firebase';

const formSelector = (state) => state.get('signUpContainer').toJS();

export function* signUpRequestSaga() {
  try {
    const { signUpForm } = yield select(formSelector);
    const errors = validateUserInputs(signUpForm);
    if (Object.keys(errors).length > 0) {
      yield put(signupActions.SignupFailure(errors));
      return;
    }
    const userStatus = '';
    const user = yield firebase
      .auth()
      .createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
    yield user.updateProfile({
      displayName: user.firstName + user.lastName,
    });
    const updateUser = user.toJSON();
    const displayName = `${signUpForm.firstName} ${signUpForm.lastName}`;
    const id = updateUser.uid;
    // console.log('userID', id);
    const DataForLocalStorge = {
      ...signUpForm,
      displayName,
      userStatus,
      id,
    };
    console.log('DataForLocalStorge', DataForLocalStorge);
    yield put(signupActions.SignUpSuccess(DataForLocalStorge));
    const strigfiedData = JSON.stringify(DataForLocalStorge);
    // console.log('DataForLocalStorge2', strigfiedData);
    localStorage.setItem('user', strigfiedData);
    setUserDataIntoDatabase({
      ...updateUser, // efredly el klam da hna
      ...signUpForm,
      userStatus,
    });
    yield put(push('/mainPage'));
  } catch (error) {
    console.log('Error while trying to add user to database', error);
    // yield put(signupActions.SignupFailure(error));
  }
}

const setUserDataIntoDatabase = async ({
  firstName,
  lastName,
  password,
  userStatus,
  email,
  uid,
}) => {
  try {
    const userData = {
      firstName,
      lastName,
      displayName: `${firstName} ${lastName}`,
      email,
      userStatus,
      password,
      id: uid,
    };
    // console.log('update user => ', userData);
    await database.ref(`/Users/${uid}`).set(userData);
    return userData;
  } catch (error) {
    return false;
  }
};

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
