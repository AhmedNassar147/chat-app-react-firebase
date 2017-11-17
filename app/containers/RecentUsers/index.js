/**
 *
 * RecentUsers
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectRecentUsers from './selectors';
import reducer from './reducer';
import saga from './saga';

export class RecentUsers extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>RecentUsers</title>
          <meta name="description" content="Description of RecentUsers" />
        </Helmet>
      </div>
    );
  }
}

RecentUsers.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  recentusers: makeSelectRecentUsers(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'recentUsers', reducer });
const withSaga = injectSaga({ key: 'recentUsers', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RecentUsers);
