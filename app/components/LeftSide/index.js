import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

// eslint-disable-next-line
class LeftSide extends React.Component {
  render() {
    // if (!this.props.userProfile || this.props.userProfile.length > 0) { return <div />; }
    const { displayName, email, userStatus } = this.props.userProfile;
    return (
      <div>
        <Subheader>
          <h3>Profile</h3>
        </Subheader>
        <List>
          <ListItem primaryText="Name" secondaryText={displayName} />
          <ListItem primaryText="Email" secondaryText={email} />
          <ListItem primaryText="AboutMe" secondaryText={userStatus} />
        </List>
      </div>
    );
  }
}

LeftSide.propTypes = {
  userProfile: PropTypes.object,
};

export default LeftSide;
