import React from 'react';
import { List, ListItem } from 'material-ui';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

const userProfileUrl =
  'https://s-media-cache-ak0.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png';

const UserComponent = ({ user, startChat, retreiveMessages, currentUser }) => (
  <div key={user.id}>
    <ListItem
      primaryText={user.displayName}
      leftAvatar={<Avatar src={userProfileUrl} />}
      rightIcon={<CommunicationChatBubble />}
      onClick={() => {
        startChat(user.id);
        retreiveMessages(currentUser.id, user.id);
      }}
    />
    <Divider />
  </div>
);
UserComponent.propTypes = {
  user: PropTypes.object.isRequired,
  startChat: PropTypes.func,
  retreiveMessages: PropTypes.func,
  currentUser: PropTypes.object.isRequired,
};
// eslint-disable-next-line
class RightSide extends React.Component {
  getEveryUser = () => (
    <div>
      {this.props.data &&
        this.props.data.map((user) => (
          <UserComponent
            key={user.id}
            user={user}
            startChat={this.props.startChat}
            retreiveMessages={this.props.retreiveMessages}
            currentUser={this.props.currentUser}
          />
        ))}
    </div>
  );

  render() {
    const { data, currentUser } = this.props;
    if (!data || data.length < 1) {
      return <span>There is no users wait for loading..</span>;
    }
    return (
      <div>
        <Subheader>
          <h3>Recent Users</h3>
        </Subheader>
        <List>{this.getEveryUser()}</List>
      </div>
    );
  }
}
RightSide.propTypes = {
  data: PropTypes.array,
  startChat: PropTypes.func,
  retreiveMessages: PropTypes.func,
  currentUser: PropTypes.object.isRequired,
};
export default RightSide;
