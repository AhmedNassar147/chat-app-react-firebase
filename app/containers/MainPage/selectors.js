import { createSelector } from 'reselect';

/**
 * Direct selector to the mainPage state domain
 */
const selectMainPageDomain = (state) => state.get('mainPage');


const makeSelectMainPage = () => createSelector(
  selectMainPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectMainPage;
export {
  selectMainPageDomain,
};
