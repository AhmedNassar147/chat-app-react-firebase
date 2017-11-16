import { createSelector } from 'reselect';

const selectSignUpContainerDomain = (state) => state.get('signUpContainer');

export const makeSelectForm = () =>
  createSelector(selectSignUpContainerDomain, (substate) =>
    substate.get('signUpForm').toJS(),
  );
export const makeSelectErrors = () =>
  createSelector(selectSignUpContainerDomain, (substate) =>
    substate.get('error').toJS(),
  );

export default makeSelectForm;
