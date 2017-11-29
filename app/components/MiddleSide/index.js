import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  List,
  ListItem,
  Avatar,
  TextField,
  RaisedButton,
} from 'material-ui';

const userProfileUrl =
  'https://s-media-cache-ak0.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png';

const MessageNotFound = ({ messageError }) => (
  <ListItem>
    <span>{messageError}</span>
  </ListItem>
);
MessageNotFound.propTypes = {
  messageError: PropTypes.any,
};

const MessagesItem = ({ isCurrentUser, text }) => (
  <ListItem
    style={{
      display: 'flex',
      justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
    }}
  >
    <span>{text}</span>
  </ListItem>
);
MessagesItem.propTypes = {
  isCurrentUser: PropTypes.bool,
  text: PropTypes.any,
};
const MessageList = ({ messages, currentUserId }) => (
  <div>
    <div style={{ height: '80%' }}>
      <List style={{ display: 'flex', flexDirection: 'column' }}>
        {messages === [] || messages == null ? (
          <MessageNotFound
            key="error"
            messageError="there is no messages between you"
          />
        ) : (
          messages.map((msg) => (
            <MessagesItem
              key={msg.date}
              isCurrentUser={msg.senderId === currentUserId}
              text={msg.message}
            />
          ))
        )}
      </List>
    </div>
  </div>
);

MessageList.propTypes = {
  messages: PropTypes.array,
  currentUserId: PropTypes.any,
};

// eslint-disable-next-line
class MiddleSide extends React.Component {
  componentWillMount() {
    this.setState({
      inputValue: '',
    });
  }
  onResetField = () => {
    this.setState({
      inputValue: '',
    });
  };

  onSendingMessage = (sendMessageRequest, receiverUserId, messageValue) =>
    sendMessageRequest(receiverUserId, messageValue);
  render() {
    const {
      userInfo,
      currentUser,
      sendMessageRequest,
      messageInputChange,
      messages,
    } = this.props;
    return (
      <div>
        <Paper style={{ height: '100%' }}>
          <div style={{ backgroundColor: '#F3E5F5' }}>
            <List>
              <ListItem
                leftAvatar={<Avatar src={userProfileUrl} />}
                primaryText={userInfo.displayName}
              />
            </List>
          </div>

          <MessageList messages={messages} currentUserId={currentUser.id} />

          <div style={{ height: '10%', display: 'flex', margin: '0 20px' }}>
            <List style={{ flex: '7' }}>
              <TextField
                fullWidth
                hintText="type Message"
                name="message"
                value={this.state.inputValue}
                onChange={(event) => {
                  this.setState({
                    inputValue: event.target.value,
                  });
                  return messageInputChange(event);
                }}
              />
            </List>

            <List style={{ flex: '1' }}>
              <RaisedButton
                fullWidth
                secondary
                label="SendMessage"
                onClick={() => {
                  this.onSendingMessage(
                    sendMessageRequest,
                    userInfo.id,
                    this.state.inputValue
                  );
                  this.onResetField();
                }}
              />
            </List>
          </div>
        </Paper>
      </div>
    );
  }
}

MiddleSide.propTypes = {
  userInfo: PropTypes.object.isRequired,
  messageInputChange: PropTypes.func,
  sendMessageRequest: PropTypes.func,
  messages: PropTypes.array,
  currentUser: PropTypes.object,
};

export default MiddleSide;
