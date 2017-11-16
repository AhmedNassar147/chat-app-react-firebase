import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
  Paper,
  TextField,
  RaisedButton,
  Dialog,
  FlatButton,
} from 'material-ui';
import { createStructuredSelector } from 'reselect';
import selectLoginForm from './selectors';
import loginActions from './actions';
import sagas from './saga';
import injectSaga from '../../utils/injectSaga';

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  componentWillMount() {
    this.props.OnLoginPageLoading();
  }
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { form, error } = this.props.loginForm;
    const actions = [
      <FlatButton label="Ok" primary onClick={this.props.closeModal} />,
    ];
    return (
      <div style={movepaper}>
        <Paper style={paddingPaper}>
          <div style={centerizeElement}>
            <h2>LoginPage</h2>
          </div>
          <TextField
            fullWidth
            hintText="UserName"
            name="username"
            defaultValue={form.username}
            onChange={this.props.onInputChange}
          />
          <TextField
            fullWidth
            hintText="Password"
            defaultValue={form.password}
            name="password"
            onChange={this.props.onInputChange}
          />
          <RaisedButton
            fullWidth
            primary
            label="Login"
            onClick={this.props.onLogin}
          />
          <RaisedButton
            fullWidth
            secondary
            label="Signup"
            onClick={this.props.Signedupclicked}
          />
        </Paper>
        <Dialog actions={actions} open={error.exist}>
          {error.username}
          <br />
          {error.password}
          <br />
          {error.serverError}
        </Dialog>
      </div>
    );
  }
}
const movepaper = {
  margin: '25vh',
};
const centerizeElement = {
  textAlign: 'center',
};
const paddingPaper = {
  padding: 32,
};

HomePage.propTypes = {
  Signedupclicked: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  loginForm: PropTypes.object.isRequired,
  OnLoginPageLoading: PropTypes.func.isRequired,
};
const mapStateToProps = createStructuredSelector({
  loginForm: selectLoginForm(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    Signedupclicked: () => dispatch(push('/signup')), // when u navigate to another page
    onLogin: () => dispatch(loginActions.request()), // when you click login button and fire action request with saga
    // dispatching your action and get the input value
    onInputChange: (event, value) =>
      dispatch(
        loginActions.loginFormChanged({ inputName: event.target.name, value }),
      ),
    closeModal: () => dispatch(loginActions.closeModal()),
    OnLoginPageLoading: () =>
      dispatch(loginActions.loginpageloadWhenUserAleadyloged()),
  };
}

const ConnectedHomePage = connect(mapStateToProps, mapDispatchToProps)(
  HomePage,
);
export const withSaga = injectSaga({ key: 'HomePage', saga: sagas });
export default compose(withSaga)(ConnectedHomePage);
