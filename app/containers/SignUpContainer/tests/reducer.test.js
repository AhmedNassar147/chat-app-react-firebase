
import { fromJS } from 'immutable';
import signUpContainerReducer from '../reducer';

describe('signUpContainerReducer', () => {
  it('returns the initial state', () => {
    expect(signUpContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
