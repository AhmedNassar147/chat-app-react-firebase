/**
*
* Appbar
*
*/

import React from 'react';
import { AppBar } from 'material-ui';
// import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class Appbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleToggle = () =>
    this.setState({
      open: !this.state.open,
    });
  render() {
    return (
      <div>
        <AppBar
          title="Chat"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onClick={this.handleToggle}
        />
        <Drawer open={this.state.open}>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
}

Appbar.propTypes = {};

export default Appbar;
