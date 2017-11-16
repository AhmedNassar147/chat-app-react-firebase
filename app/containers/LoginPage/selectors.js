import { createSelector } from 'reselect';
export const selectloginContainerDomain = (state) => state.get('login');
const makeSelectloginContainer = () =>
  createSelector(selectloginContainerDomain, (substate) => substate.toJS());

export default makeSelectloginContainer;
