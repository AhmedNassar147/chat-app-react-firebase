import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

// eslint-disable-next-line
class LeftSide extends React.Component {
  render() {
    // if (!this.props.userProfile || this.props.userProfile.length > 0) { return <div />; }
    return (
      <div>
        <Subheader>
          <h3>Profile</h3>
        </Subheader>
        <List>
          <ListItem
            primaryText="Name"
            secondaryText={this.props.userProfile.displayName}
          />
          <ListItem
            primaryText="Email"
            secondaryText={this.props.userProfile.Email}
          />
          <ListItem
            primaryText="AboutMe"
            secondaryText={this.props.userProfile.userStatus}
          />
        </List>
      </div>
    );
  }
}

LeftSide.propTypes = {
  userProfile: PropTypes.array,
};

export default LeftSide;
