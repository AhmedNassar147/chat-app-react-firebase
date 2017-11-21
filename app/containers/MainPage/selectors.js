import { createSelector } from 'reselect';

/**
 * Direct selector to the mainPage state domain
 */
const selectMainPageDomain = (state) => state.get('mainPage');

export const makeSelectSUserStatus = () =>
  createSelector(selectMainPageDomain, (substate) =>
    substate.get('updateUserStatusInputChanged').toJS()
  );
export default makeSelectSUserStatus;
