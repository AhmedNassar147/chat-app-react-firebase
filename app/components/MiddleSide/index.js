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
// eslint-disable-next-line
class MiddleSide extends React.Component {
  render() {
    return (
      <div>
        <Paper style={{ height: '93vh' }}>
          <div style={{ backgroundColor: '#F3E5F5' }}>
            <List>
              <ListItem
                leftAvatar={
                  <Avatar src="https://s-media-cache-ak0.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png" />
                }
                primaryText={this.props.user.displayName}
              />
            </List>
          </div>
          <div style={{ height: '80%' }}>
            <List />
          </div>
          <div style={{ height: '10%', display: 'flex', margin: '0 20px' }}>
            <List style={{ flex: '7' }}>
              <TextField fullWidth hintText="type Message" name="message" />
            </List>
            <List style={{ flex: '1' }}>
              <RaisedButton fullWidth secondary label="Send" />
            </List>
          </div>
        </Paper>
      </div>
    );
  }
}

MiddleSide.propTypes = {
  user: PropTypes.array.isRequired,
};

export default MiddleSide;
