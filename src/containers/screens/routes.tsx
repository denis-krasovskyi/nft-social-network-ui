import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import UIAppLayout from 'containers/layouts/UIAppLayout';

import SignInScreen from './SignIn';
import SignUpScreen from './SignUp';
import ChangePasswordScreen from './ChangePassword';
import AskQuestionScreen from './AskQuestion';
import ForgotPasswordScreen from './ForgotPassword';
import NotificationsScreen from './Notifications';
import AccountScreen from './Account';
import EditAccountScreen from './EditAccount';
import FeedScreen from './Feed';
import NFTScreen from './NFT';
import UserPageScreen from './UserPage';
import SearchScreen from './Search';
import FollowersPage from './Followers';
// import DeepLink from './DeepLink';

const Routes: React.FC = () => {
  return (
    <div style={{ maxWidth: '450px', width: '100%', margin: 'auto' }}>
      <Switch>
        <Route path="/cabinet">
          <UIAppLayout>
            <Switch>
              <Route path="/cabinet/nft/:id">
                <NFTScreen />
              </Route>

              <Route path="/cabinet/profile/:id">
                <UserPageScreen />
              </Route>

              <Route path="/cabinet/followers/:id">
                <FollowersPage />
              </Route>

              <Route path="/cabinet/feed">
                <FeedScreen />
              </Route>

              <Route path="/cabinet/edit">
                <EditAccountScreen />
              </Route>

              <Route path="/cabinet/account">
                <AccountScreen />
              </Route>

              <Route path="/cabinet/search">
                <SearchScreen />
              </Route>

              <Route path="/cabinet/notifications">
                <NotificationsScreen />
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
    </div>
  );
};

export default Routes;
