import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'react-router-redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Paper, TextField, RaisedButton } from 'material-ui';
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
      <div>
        <Paper style={PaddingPaper}>
          <div style={centerizeElement}>
            <h2>RegisterationPage</h2>
          </div>
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
            errorText={passwordError}
            onChange={this.props.OninputChanged}
          />
          <RaisedButton
            fullWidth
            primary
            label="SignUp"
            onClick={this.props.OnSignUp}
          />
          <RaisedButton
            fullWidth
            secondary
            label="or login"
            onClick={this.props.onLoginCLick}
          />
        </Paper>
      </div>
    );
  }
}

const PaddingPaper = {
  padding: 32,
};
const centerizeElement = {
  textAlign: 'center',
};
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
        }),
      ),
    OnSignUploading: () => dispatch(SignUpActions.SignUploading()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'signUpContainer', reducer });
const withSaga = injectSaga({ key: 'signUpContainer', saga });

export default compose(withReducer, withSaga, withConnect)(SignUpContainer);
