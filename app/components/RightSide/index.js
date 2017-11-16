/**
*
* RightSide
*
*/

import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import ActionSupervisorAccount from 'material-ui/svg-icons/action/supervisor-account';

class RightSide extends React.Component {
  render() {
    return (
      <div>
        <Subheader>Recent Users</Subheader>
        <List>
          <ListItem
            primaryText="Brendan Lim"
            leftAvatar={<Avatar src ="images/ok-128.jpg" />}
            rightIcon={<ActionSupervisorAccount />}
          />
          <Divider />
        </List>
      </div>
    );
  }
}

RightSide.propTypes = {};

export default RightSide;
