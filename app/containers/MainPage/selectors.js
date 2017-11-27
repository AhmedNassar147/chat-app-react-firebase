import { createSelector } from 'reselect';

/**
 * Direct selector to the mainPage state domain
 */
const selectMainPageDomain = (state) => state.get('mainPage');

export const makeSelectUserStatus = () =>
  createSelector(selectMainPageDomain, (substate) =>
    substate.get('updateUserStatusInputChanged').toJS()
  );

export const makeSelectMessageInput = () =>
  createSelector(selectMainPageDomain, (substate) =>
    substate.get('messageinputvalueChanged')
  );
export const makeSelectChatId = () =>
  createSelector(selectMainPageDomain, (substate) => substate.get('chatId'));

export default {
  makeSelectUserStatus,
  makeSelectMessageInput,
  makeSelectChatId,
};
