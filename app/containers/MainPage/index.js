import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import RightSide from 'components/RightSide';
import LeftSide from 'components/LeftSide';
import MiddleSide from 'components/MiddleSide';
import { RaisedButton } from 'material-ui';
import makeSelectMainPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { makeSelectCurrentUser } from '../App/selectors';
import MainActions from './actions';
export class MainPage extends React.Component {
  componentWillMount() {
    this.props.onMainPageLoaded();
  }
  render() {
    return (
      <div style={flexmMianPage}>
        {/* <div> {this.props.user && this.props.user.display} </div> */}
        <div style={flexSides}>
          <LeftSide />
        </div>
        <div style={flexChatSide}>
          <MiddleSide />
        </div>
        <div style={flexSides}>
          <RightSide />
        </div>
        <div>
          <RaisedButton label="Sign out" primary onClick={this.props.SignOut} />
        </div>
      </div>
    );
  }
}
const flexmMianPage = {
  display: 'flex',
};
const flexSides = {
  flex: 1,
};
const flexChatSide = {
  flex: 3,
};

MainPage.propTypes = {
  onMainPageLoaded: PropTypes.func.isRequired,
  // user: PropTypes.object.isRequired,
  SignOut: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mainpage: makeSelectMainPage(),
  user: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onMainPageLoaded: () => dispatch(MainActions.onMainPageLoaded()),
    SignOut: () => dispatch(MainActions.SignOut()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'mainPage', reducer });
const withSaga = injectSaga({ key: 'mainPage', saga });
export default compose(withReducer, withSaga, withConnect)(MainPage);
