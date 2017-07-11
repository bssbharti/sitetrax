import React from 'react';
import { Route, IndexRoute } from 'react-router';
import * as actions from './actions/apiActions';
import configureStore from './store/configureStore';
const store = configureStore();

import App from './components/App';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function checkAuth(nextState, replace) {
  let { loggedIn } = store.getState();
  // check if the path isn't dashboard
  // that way we can apply specific logic
  // to display/render the path we want to
  // loggedIn = true

  console.log("login status", loggedIn);

  if (nextState.location.pathname !== '/dashboard') {
    if (loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replace(nextState.location.pathname);
      } else {
        replace('/dashboard');
      }
    }
  } else {
    // If the user is already logged in, forward them to the homepage
    if (!loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replace(nextState.location.pathname);
      } else {
        replace('/');
      }
    }
  }
}

export default (
  <Route path="/" onEnter={checkAuth}>
    <IndexRoute component={HomePage} />
    <Route path="/password/reset" component={ResetPasswordPage} />
    <Route path="/dashboard" component={App} >
      <IndexRoute component={DashboardPage} />
      <Route path="/profile" component={ProfilePage} />
    </Route>
  </Route>
);
