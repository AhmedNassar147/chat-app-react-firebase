/**
*
* LeftSide
*
*/

import React from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

class LeftSide extends React.Component {
  render() {
    return (
      <div>
        <List>
          <Subheader>Friends</Subheader>
          <ListItem
            primaryText="Brendan Lim"
            leftAvatar={<Avatar src="images/ok-128.jpg" />}
            rightIcon={<CommunicationChatBubble />}
          />
          <Divider />
        </List>
      </div>
    );
  }
}

LeftSide.propTypes = {};

export default LeftSide;
