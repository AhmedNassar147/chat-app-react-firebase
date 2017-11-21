/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectCurrentUser = () =>
  createSelector(selectGlobal, (globalState) => globalState.get('userData'));
const makeSelectAllUsers = () =>
  createSelector(selectGlobal, (globalState) =>
    globalState.get('usersFromDatabase').toJS()
  );

const makeSelectGetUser = () =>
  createSelector(selectGlobal, (globalState) =>
    globalState.get('getUserinfo').toJS()
  );
const makeSelectLoading = () =>
  createSelector(selectGlobal, (globalState) => globalState.get('loading'));

const makeSelectError = () =>
  createSelector(selectGlobal, (globalState) => globalState.get('error'));

const makeSelectRepos = () =>
  createSelector(selectGlobal, (globalState) =>
    globalState.getIn(['userData', 'repositories'])
  );

const makeSelectLocation = () =>
  createSelector(selectRoute, (routeState) => routeState.get('location').toJS());

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectAllUsers,
  makeSelectGetUser,
};
