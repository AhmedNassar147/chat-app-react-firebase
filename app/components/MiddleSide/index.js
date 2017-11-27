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
const MessageList = ({ messages, currentUserId, messagesNotFound }) => (
  <div>
    <div>
      <List>
        {messagesNotFound &&
          messagesNotFound.map((msgNotFound) => (
            <MessageNotFound
              key={msgNotFound.msgId}
              messageError={msgNotFound.error}
            />
          ))}
      </List>
    </div>
    <div style={{ height: '80%' }}>
      <List style={{ display: 'flex', flexDirection: 'column' }}>
        {messages &&
          messages.map((msg) => (
            <MessagesItem
              key={msg.date}
              isCurrentUser={msg.senderId === currentUserId}
              text={msg.message}
            />
          ))}
      </List>
    </div>
  </div>
);

MessageList.propTypes = {
  messages: PropTypes.array,
  currentUserId: PropTypes.any,
  messagesNotFound: PropTypes.array,
};

// eslint-disable-next-line
class MiddleSide extends React.Component {
  onSendingMessage = () =>
    this.props.sendMessageRequest(this.props.userInfo.id);

  render() {
    const {
      userInfo,
      messageInputChange,
      messages,
      currentUser,
      messagesNotFound,
    } = this.props;

    return (
      <div>
        <Paper style={{ height: '100%' }}>
          {/* header her */}
          <div style={{ backgroundColor: '#F3E5F5' }}>
            <List>
              <ListItem
                leftAvatar={<Avatar src={userProfileUrl} />}
                primaryText={userInfo.displayName}
              />
            </List>
          </div>

          {/* messages show up her at the middle of the page*/}
          <MessageList
            messages={messages}
            currentUserId={currentUser.id}
            messagesNotFound={messagesNotFound}
          />

          {/* bottom her for type message and send it */}
          <div style={{ height: '10%', display: 'flex', margin: '0 20px' }}>
            <List style={{ flex: '7' }}>
              <TextField
                fullWidth
                hintText="type Message"
                name="message"
                onChange={messageInputChange}
              />
            </List>
            <List style={{ flex: '1' }}>
              <RaisedButton
                fullWidth
                secondary
                label="SendMessage"
                onClick={this.onSendingMessage}
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
  messagesNotFound: PropTypes.array,
};

export default MiddleSide;
