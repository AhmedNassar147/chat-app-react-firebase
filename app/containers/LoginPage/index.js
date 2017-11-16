import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { TextField, RaisedButton, Dialog, FlatButton } from 'material-ui';
import Container from 'components/RegisterContainer';
import { createStructuredSelector } from 'reselect';
import selectLoginForm from './selectors';
import loginActions from './actions';
import sagas from './saga';
import injectSaga from '../../utils/injectSaga';
export class LoginPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
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
      <Container title="Login">
        <TextField
          fullWidth
          hintText="Email"
          name="username"
          errorText={error.username}
          defaultValue={form.username}
          onChange={this.props.onInputChange}
        />
        <TextField
          fullWidth
          type="password"
          hintText="Password"
          defaultValue={form.password}
          name="password"
          errorText={error.password}
          onChange={this.props.onInputChange}
        />
        <RaisedButton
          style={{ marginBottom: 8 }}
          fullWidth
          primary
          label="Login"
          onClick={this.props.onLogin}
        />
        <br />
        <RaisedButton
          fullWidth
          secondary
          label="Signup"
          onClick={this.props.Signedupclicked}
        />
        {/* using false for now to just keep the modal close to be
          replaced with redux error handler */}
        <Dialog actions={actions} open={false}>
          {error.username}
          <br />
          {error.password}
          <br />
          {error.serverError}
        </Dialog>
      </Container>
    );
  }
}

LoginPage.propTypes = {
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
        loginActions.loginFormChanged({ inputName: event.target.name, value })
      ),
    closeModal: () => dispatch(loginActions.closeModal()),
    OnLoginPageLoading: () =>
      dispatch(loginActions.loginpageloadWhenUserAleadyloged()),
  };
}

const ConnectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(
  LoginPage
);
export const withSaga = injectSaga({ key: 'LoginPage', saga: sagas });
export default compose(withSaga)(ConnectedLoginPage);
