import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import SignUp from 'containers/SignUpContainer';
import MainPage from 'containers/MainPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Appbar from '../../components/Appbar';
import firebase from '../../utils/firebase';

const AppWrapper = styled.div `
  max-width: 100vw;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;
export default function App() {
  return (
    <MuiThemeProvider>
      <AppWrapper>
        <div><Appbar /></div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/mainPage" component={MainPage} />
          <Route exact path="/signup" component={SignUp} />
          <Route path="/features" component={FeaturePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </AppWrapper>
    </MuiThemeProvider>
  );
}
