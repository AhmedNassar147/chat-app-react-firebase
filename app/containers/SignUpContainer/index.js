import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'react-router-redux';
import injectSaga from 'utils/injectSaga';
import Container from 'components/RegisterContainer';
import injectReducer from 'utils/injectReducer';
import { TextField, RaisedButton } from 'material-ui';
import { makeSelectForm, makeSelectErrors } from './selectors';
import SignUpActions from './actions';
import reducer from './reducer';
import saga from './saga';

export class SignUpContainer extends React.Component {
  componentWillMount() {
    this.props.OnSignUploading();
  }
  render() {
    const {
      firstName: firstNameError,
      lastName: lastNameError,
      email: emailError,
      password: passwordError,
    } = this.props.errors;
    return (
      <Container title="Sign up">
        <TextField
          // defaultValue={firstName}
          fullWidth
          hintText="FisrtName"
          name="firstName"
          errorText={firstNameError}
          onChange={this.props.OninputChanged}
        />
        <TextField
          // defaultValue={lastName}
          fullWidth
          hintText="LastName"
          name="lastName"
          errorText={lastNameError}
          onChange={this.props.OninputChanged}
        />
        <TextField
          // defaultValue={email}
          fullWidth
          hintText="Email"
          name="email"
          errorText={emailError}
          onChange={this.props.OninputChanged}
        />
        <TextField
          // defaultValue={password}
          fullWidth
          hintText="Password"
          name="password"
          type="password"
          errorText={passwordError}
          onChange={this.props.OninputChanged}
        />
        <RaisedButton
          fullWidth
          primary
          label="SignUp"
          onClick={this.props.OnSignUp}
          style={{ marginBottom: 8 }}
        />
        <RaisedButton
          fullWidth
          secondary
          label="or login"
          onClick={this.props.onLoginCLick}
        />
      </Container>
    );
  }
}

SignUpContainer.propTypes = {
  onLoginCLick: PropTypes.func.isRequired,
  OninputChanged: PropTypes.func.isRequired,
  OnSignUp: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  OnSignUploading: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  form: makeSelectForm(),
  errors: makeSelectErrors(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoginCLick: () => dispatch(push('/')),
    OnSignUp: () => dispatch(SignUpActions.SignUpRequest()),
    OninputChanged: (event, value) =>
      dispatch(
        SignUpActions.SignUpForm({
          inputName: event.target.name,
          inputValue: value,
        })
      ),
    OnSignUploading: () => dispatch(SignUpActions.SignUploading()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'signUpContainer', reducer });
const withSaga = injectSaga({ key: 'signUpContainer', saga });

export default compose(withReducer, withSaga, withConnect)(SignUpContainer);
