import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import UIAppLayout from 'containers/layouts/UIAppLayout';

import SignInScreen from './SignIn';
import SignUpScreen from './SignUp';
import ChangePasswordScreen from './ChangePassword';
import AskQuestionScreen from './AskQuestion';
import ForgotPasswordScreen from './ForgotPassword';
import ManagersFeedScreen from './ManagersFeed';
import EditProfileScreen from './EditProfile';
import AccountScreen from './Account';
import ManageSavedScreen from './ManageSaved';
import CandidateScreen from './Candidate';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/cabinet">
        <UIAppLayout>
          <Switch>
            <Route path="/cabinet/managers-feed/candidate/:id">
              <CandidateScreen />
            </Route>
            <Route path="/cabinet/feed">
              <ManagersFeedScreen />
            </Route>
            <Route path="/cabinet/account">
              <AccountScreen />
            </Route>
            <Route path="/cabinet/account-edit">
              <EditProfileScreen />
            </Route>

            <Route path="/cabinet/notifications">
              <ManageSavedScreen />
            </Route>
          </Switch>
        </UIAppLayout>
      </Route>

      <Route path="/sign-up">
        <SignUpScreen />
      </Route>

      <Route path="/change-password">
        <ChangePasswordScreen />
      </Route>

      <Route path="/forgot-password">
        <ForgotPasswordScreen />
      </Route>

      <Route path="/ask">
        <AskQuestionScreen />
      </Route>

      <Route path="/sign-in">
        <SignInScreen />
      </Route>

      <Redirect to="/sign-in" />
    </Switch>
  );
};

export default Routes;
