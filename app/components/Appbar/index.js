import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Drawer,
  Avatar,
  RaisedButton,
  List,
  ListItem,
  Dialog,
  FlatButton,
  TextField,
  blue200,
} from 'material-ui';

class Appbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dialog: false,
    };
  }
  // for drawer
  handleToggle = () =>
    this.setState({
      open: !this.state.open,
    });
  // for dialog
  handleOpen = () => {
    this.setState({ dialog: true });
  };
  // for dialog
  handleClose = () => {
    this.setState({ dialog: false });
  };
  render() {
    // eslint-disable-next-line
    const { userName, signout } = this.props;
    const getUserFromlocalStorage = JSON.parse(localStorage.getItem('user'));
    const getUserEmail = getUserFromlocalStorage.email;
    let userDisplayName = ' ';
    const EmailAddress = 'Email:';
    const users = userName.map((user) => user);
    // eslint-disable-next-line
    for (let user = 0; user < users.length; user++) {
      const element = users[user];
      if (element.Email === getUserEmail) userDisplayName = element.displayName;
    }
    const userId = getUserFromlocalStorage.uid;
    const actions = [
      <FlatButton label="Cancel" primary onClick={this.handleClose} />,
      <RaisedButton
        label="Submit"
        primary
        onClick={() => this.props.OnUpdateUserStatus(userId)}
      />,
    ];
    return (
      <div>
        <AppBar
          title="Chat"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onClick={this.handleToggle}
        />
        <Drawer open={this.state.open}>
          <div style={{ height: '15vh', backgroundColor: blue200 }}>
            <List style={{ paddingTop: '30px' }}>
              <ListItem
                leftAvatar={
                  <Avatar src="https://s-media-cache-ak0.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png" />
                }
                primaryText={userDisplayName}
              />
              <ListItem primaryText={EmailAddress + getUserEmail} />
            </List>
          </div>
          <RaisedButton
            label="Who Iam i ?"
            fullWidth
            style={{ marginBottom: 4, marginTop: 4 }}
            backgroundColor="#FFEBEE"
            onClick={this.handleOpen}
          />
          <RaisedButton
            label="signOut"
            fullWidth
            style={{ marginBottom: 4, marginTop: 4 }}
            backgroundColor="#90CAF9"
            onClick={this.props.signout}
          />
        </Drawer>
        <div>
          <Dialog
            title="Write info about you"
            actions={actions}
            open={this.state.dialog}
          >
            <TextField
              fullWidth
              hintText="type info"
              name="aboutUser"
              onChange={(event, value) =>
                this.props.OnInputUserInfoChanged(event, value)}
            />
          </Dialog>
        </div>
      </div>
    );
  }
}

Appbar.propTypes = {
  signout: PropTypes.func,
  userName: PropTypes.array,
  OnUpdateUserStatus: PropTypes.func,
  OnInputUserInfoChanged: PropTypes.func.isRequired,
};

export default Appbar;
