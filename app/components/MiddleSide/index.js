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

// eslint-disable-next-line
class MiddleSide extends React.Component {
  onSendingMessage = () =>
    this.props.sendMessageRequest(this.props.userInfo.id);

  render() {
    const { userInfo, messageInputChange } = this.props;
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
          <div style={{ height: '80%' }}>
            <List>
              <p>dsdsdsddsdddddddddddddddd</p>
            </List>
          </div>
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
};

export default MiddleSide;
