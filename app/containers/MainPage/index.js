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
import { makeSelectUserStatus } from './selectors';
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
    const {
      allUsers,
      OnSignOutClicked,
      OnInputUserInfoChanged,
      OnUpdateUserStatusoButtonClicked,
      getUserInfo,
      OnMessageInputChange,
      OnRequestGetUser,
      onRequestSendMessage,
    } = this.props;
    return (
      <div>
        <div>
          <Appbar
            userName={allUsers}
            signout={OnSignOutClicked}
            OnInputUserInfoChanged={OnInputUserInfoChanged}
            OnUpdateUserStatus={OnUpdateUserStatusoButtonClicked}
          />
        </div>
        <div style={flexmMianPage}>
          <div style={flexSides}>
            <LeftSide userProfile={getUserInfo} />
          </div>
          <div style={flexChatSide}>
            <MiddleSide
              userInfo={getUserInfo}
              messageInputChange={OnMessageInputChange}
              sendMessageRequest={onRequestSendMessage}
            />
          </div>
          <div style={flexSides}>
            <RightSide data={allUsers} startChat={OnRequestGetUser} />
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
  height: '100%',
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
  getUserInfo: PropTypes.object,
  OnInputUserInfoChanged: PropTypes.func,
  OnUpdateUserStatusoButtonClicked: PropTypes.func,
  OnMessageInputChange: PropTypes.func,
  onRequestSendMessage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  allUsers: makeSelectAllUsers(),
  getUserInfo: makeSelectGetUser(),
  updateUserStatusInputChanged: makeSelectUserStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    onMainPageLoaded: () => dispatch(MainActions.onMainPageLoaded()),
    OnRetreiveUsersRequest: () => dispatch(MainActions.RquestRetreiveUsers()),
    OnSignOutClicked: () => dispatch(MainActions.SignOutRequest()),
    OnRequestGetUser: (id) => dispatch(MainActions.RequestGetUser(id)),
    OnInputUserInfoChanged: (event, value) =>
      dispatch(
        MainActions.OnUpdateUserInfoChanged({
          inputName: event.target.name,
          inputValue: value,
        })
      ),
    OnUpdateUserStatusoButtonClicked: (userId) =>
      dispatch(MainActions.RequestUpdateUserStatus(userId)),
    OnMessageInputChange: (event, value) =>
      dispatch(
        MainActions.messageInputChaneged({
          inputName: event.target.name,
          inputValue: value,
        })
      ),
    onRequestSendMessage: (userInfoId) =>
      dispatch(MainActions.requestSendMesage(userInfoId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'mainPage', reducer });
const withSaga = injectSaga({ key: 'mainPage', saga });
export default compose(withReducer, withSaga, withConnect)(MainPage);
