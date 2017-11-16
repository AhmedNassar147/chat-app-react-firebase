import { createSelector } from 'reselect';

/**
 * Direct selector to the loginContainer state domain
 */
export const selectloginContainerDomain = (state) => state.get('login');

/**
 * Other specific selectors
 */

/**
 * Default selector used by loginContainer
 */

const makeSelectloginContainer = () =>
  createSelector(selectloginContainerDomain, (substate) => substate.toJS());

export default makeSelectloginContainer;
