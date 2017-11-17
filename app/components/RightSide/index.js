import React, { PropTypes } from 'react';
import { List, ListItem } from 'material-ui';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import ActionSupervisorAccount from 'material-ui/svg-icons/action/supervisor-account';

// eslint-disable-next-line
class RightSide extends React.Component {
  render() {
    const { data } = this.props;
    if (!data || data.length < 1) return <span>There is no users</span>;
    return (
      <div>
        <Subheader>Recent Users</Subheader>
        <List>
          {data &&
            data.map((user) => (
              <div>
                <ListItem
                  primaryText={user.displayName}
                  leftAvatar={<Avatar src={user.image} />}
                  rightIcon={<ActionSupervisorAccount />}
                />
                <Divider />
              </div>
            ))}
        </List>
      </div>
    );
  }
}

RightSide.propTypes = {
  data: PropTypes.arrayOf({
    displayName: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default RightSide;

// const dummyData = [
//   {
//     userName: 'Hamada 1',
//     avatar:
//       'https://s-media-cache-ak0.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png',
//   },
//   {
//     userName: 'Hamada 2',
//     avatar:
//       'https://s-media-cache-ak0.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png',
//   },
//   {
//     userName: 'Hamada 3',
//     avatar:
//       'https://s-media-cache-ak0.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png',
//   },
// ];
