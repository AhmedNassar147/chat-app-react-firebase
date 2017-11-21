import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import RightSide from 'components/RightSide';
import LeftSide from 'components/LeftSide';
import MiddleSide from 'components/MiddleSide';
import makeSelectSUserStatus from './selectors';
import reducer from './reducer';
import saga from './saga';
import MainActions from './actions';
import {
  makeSelectCurrentUser,
  makeSelectAllUsers,
  makeSelectGetUser,
} from '../App/selectors';
import Appbar from '../../components/Appbar';

export class MainPage extends React.Component {
  componentWillMount() {
    this.props.onMainPageLoaded();
    this.props.OnRetreiveUsersRequest();
  }
  render() {
    // console.log('props', this.props.updateUserStatusInputChanged);
    return (
      <div>
        <div>
          <Appbar
            userName={this.props.allUsers}
            signout={this.props.OnSignOutClicked}
            OnInputUserInfoChanged={(event, value) =>
              this.props.OnInputUserInfoChanged(event, value)}
            OnUpdateUserStatus={(userId) =>
              this.props.OnUpdateUserStatusoButtonClicked(userId)}
          />
        </div>
        <div style={flexmMianPage}>
          <div style={flexSides}>
            <LeftSide userProfile={this.props.getUserInfo} />
          </div>
          <div style={flexChatSide}>
            <MiddleSide user={this.props.getUserInfo} />
          </div>
          <div style={flexSides}>
            <RightSide
              data={this.props.allUsers}
              startChat={(uid) => this.props.OnRequestGetUser(uid)}
            />
          </div>
        </div>
      </div>
    );
  }
}
const flexmMianPage = {
  display: 'flex',
};
const flexSides = {
  flex: 1,
};
const flexChatSide = {
  flex: 2,
};

MainPage.propTypes = {
  onMainPageLoaded: PropTypes.func.isRequired,
  OnRetreiveUsersRequest: PropTypes.func.isRequired,
  allUsers: PropTypes.array,
  OnSignOutClicked: PropTypes.func,
  OnRequestGetUser: PropTypes.func.isRequired,
  getUserInfo: PropTypes.array,
  OnInputUserInfoChanged: PropTypes.func,
  OnUpdateUserStatusoButtonClicked: PropTypes.func,
  // updateUserStatusInputChanged: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  allUsers: makeSelectAllUsers(),
  getUserInfo: makeSelectGetUser(),
  updateUserStatusInputChanged: makeSelectSUserStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    onMainPageLoaded: () => dispatch(MainActions.onMainPageLoaded()),
    OnRetreiveUsersRequest: () => dispatch(MainActions.RquestRetreiveUsers()),
    OnSignOutClicked: () => dispatch(MainActions.SignOutRequest()),
    OnRequestGetUser: (uid) => dispatch(MainActions.RequestGetUser(uid)),
    OnInputUserInfoChanged: (event, value) =>
      dispatch(
        MainActions.OnUpdateUserInfoChanged({
          inputName: event.target.name,
          inputValue: value,
        })
      ),
    OnUpdateUserStatusoButtonClicked: (userId) =>
      dispatch(MainActions.RequestUpdateUserStatus(userId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'mainPage', reducer });
const withSaga = injectSaga({ key: 'mainPage', saga });
export default compose(withReducer, withSaga, withConnect)(MainPage);
