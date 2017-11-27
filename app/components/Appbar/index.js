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
} from 'material-ui';
import { blue200 } from 'material-ui/styles/colors';

const userProfileUrl =
  'https://s-media-cache-ak0.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png';

class Appbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dialog: false,
    };
  }
  onSubmiClick = () => this.props.OnUpdateUserStatus();

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
    const { userName, signout, currentUser } = this.props;
    const actions = [
      <FlatButton label="Cancel" primary onClick={this.handleClose} />,
      <RaisedButton
        label="Submit"
        primary
        onClick={() => {
          this.props.OnUpdateUserStatus(currentUser.id);
          this.setState(({ dialog }) => ({ dialog: !dialog }));
        }}
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
                leftAvatar={<Avatar src={userProfileUrl} />}
                primaryText={currentUser.displayName}
              />
              <ListItem primaryText={`Email: ${currentUser.email}`} />
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
                this.props.OnInputUserInfoChanged(event, value)
              }
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
  currentUser: PropTypes.object.isRequired,
};

export default Appbar;
