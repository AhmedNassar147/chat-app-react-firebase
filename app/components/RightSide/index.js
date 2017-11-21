import React from 'react';
import { List, ListItem } from 'material-ui';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

// eslint-disable-next-line
class RightSide extends React.Component {
  getEveryuser = () => (
    <div>
      {this.props.data &&
        this.props.data.map((user) => (
          <div>
            <ListItem
              primaryText={user.displayName}
              key={JSON.stringify(user.id)}
              leftAvatar={
                <Avatar
                  src={
                    'https://s-media-cache-ak0.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png'
                  }
                />
              }
              rightIcon={<CommunicationChatBubble />}
              onClick={() => this.props.startChat(user.id)}
            />
            <Divider />
          </div>
        ))}
    </div>
  );
  render() {
    const { data } = this.props;
    if (!data || data.length < 1) {
      return <span>There is no users wait for loading..</span>;
    }
    return (
      <div>
        <Subheader>
          <h3>Recent Users</h3>
        </Subheader>
        <List>{this.getEveryuser()}</List>
      </div>
    );
  }
}
RightSide.propTypes = {
  data: PropTypes.array,
  startChat: PropTypes.func,
};
export default RightSide;
