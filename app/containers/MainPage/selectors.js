import { createSelector } from 'reselect';

/**
 * Direct selector to the mainPage state domain
 */
const selectMainPageDomain = (state) => state.get('mainPage');

export const makeSelectUserStatus = () =>
  createSelector(selectMainPageDomain, (substate) =>
    substate.get('updateUserStatusInputChanged').toJS()
  );

export default {
  makeSelectUserStatus,
};
