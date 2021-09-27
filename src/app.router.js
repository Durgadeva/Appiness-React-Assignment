// React
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components
import { LoginPage } from './login-page/login-page';
import { DashboardPage } from './dashboard-page/dashboard-page';

// Config
import { Config } from './config';

export const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route
        path={Config.LOGIN_URL}
        exact
        component={LoginPage}
      />
      <Route
        path={Config.DASHBOARD_URL}
        exact
        component={DashboardPage}
      />
    </Switch>
  </BrowserRouter>
);
