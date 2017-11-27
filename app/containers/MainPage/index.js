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
import { makeSelectUserStatus, makeSelectChatId } from './selectors';
import reducer from './reducer';
import saga from './saga';
import MainActions from './actions';
import {
  makeSelectCurrentUser,
  makeSelectAllUsers,
  makeSelectGetUser,
  makeSelectAllMessages,
  makeSelectMessageNotFound,
} from '../App/selectors';
import Appbar from '../../components/Appbar';
// import { database } from '../../utils/firebase';

export class MainPage extends React.Component {
  componentWillMount() {
    this.props.onMainPageLoaded();
    this.props.OnRetreiveUsersRequest();
  }
  componentDidMount() {
    // database
    //   .ref(`/Chats/${this.props.chatId.chatId}`)
    //   .once('child_added', (snap) => {
    //     console.log('snap', snap.val());
    //     console.log('chatId', this.props.chatId);
    //   });
    // console.log('this.props.chatId', JSON.stringify(this.props.chatId));
  }

  render() {
    // console.log('chatid', this.props.chatId);
    const {
      user,
      allUsers,
      OnSignOutClicked,
      OnInputUserInfoChanged,
      OnUpdateUserStatusoButtonClicked,
      getUserInfo,
      OnMessageInputChange,
      OnRequestGetUser,
      onRequestSendMessage,
      onRetreiveMessages,
      allMessage,
      messagesNotFound,
      chatId,
    } = this.props;
    return (
      <div>
        <div>
          <Appbar
            userName={allUsers}
            signout={OnSignOutClicked}
            OnInputUserInfoChanged={OnInputUserInfoChanged}
            OnUpdateUserStatus={OnUpdateUserStatusoButtonClicked}
            currentUser={user}
          />
        </div>
        <div style={flexmMianPage}>
          <div style={flexSides}>
            <LeftSide userProfile={getUserInfo} />
          </div>
          <div style={flexChatSide}>
            <MiddleSide
              userInfo={getUserInfo}
              currentUser={user}
              messageInputChange={OnMessageInputChange}
              sendMessageRequest={onRequestSendMessage}
              messages={allMessage}
              messagesNotFound={messagesNotFound}
            />
          </div>
          <div style={flexSides}>
            <RightSide
              data={allUsers}
              startChat={OnRequestGetUser}
              retreiveMessages={onRetreiveMessages}
              currentUser={user}
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
  height: '100%',
};
const flexChatSide = {
  flex: 2,
};

MainPage.propTypes = {
  onMainPageLoaded: PropTypes.func.isRequired,
  OnRetreiveUsersRequest: PropTypes.func.isRequired,
  allUsers: PropTypes.array,
  user: PropTypes.object,
  OnSignOutClicked: PropTypes.func,
  OnRequestGetUser: PropTypes.func.isRequired,
  getUserInfo: PropTypes.object,
  OnInputUserInfoChanged: PropTypes.func,
  OnUpdateUserStatusoButtonClicked: PropTypes.func,
  OnMessageInputChange: PropTypes.func,
  onRequestSendMessage: PropTypes.func,
  onRetreiveMessages: PropTypes.func,
  allMessage: PropTypes.array,
  messagesNotFound: PropTypes.array,
  chatId: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  allUsers: makeSelectAllUsers(),
  getUserInfo: makeSelectGetUser(),
  updateUserStatusInputChanged: makeSelectUserStatus(),
  allMessage: makeSelectAllMessages(),
  messagesNotFound: makeSelectMessageNotFound(),
  chatId: makeSelectChatId(),
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

    onRequestSendMessage: (selectedUserId) =>
      dispatch(MainActions.requestSendMesage(selectedUserId)),

    onRetreiveMessages: (currentUserId, selectedUserId) =>
      dispatch(
        MainActions.requestRetreiveMessages(currentUserId, selectedUserId)
      ),

    //   onMessageRecieved: (message) =>
    //     dispatch(MainActions.messageRetreivedSuccuss(message)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'mainPage', reducer });
const withSaga = injectSaga({ key: 'mainPage', saga });
export default compose(withReducer, withSaga, withConnect)(MainPage);
