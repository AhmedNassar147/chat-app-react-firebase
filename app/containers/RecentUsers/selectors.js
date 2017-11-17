import { createSelector } from 'reselect';

/**
 * Direct selector to the recentUsers state domain
 */
const selectRecentUsersDomain = (state) => state.get('recentUsers');

/**
 * Other specific selectors
 */


/**
 * Default selector used by RecentUsers
 */

const makeSelectRecentUsers = () => createSelector(
  selectRecentUsersDomain,
  (substate) => substate.toJS()
);

export default makeSelectRecentUsers;
export {
  selectRecentUsersDomain,
};
