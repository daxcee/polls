import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Main from './components/Main';
import Login from './components/Login';
import Signup from './components/Signup';
import Recover from './components/Recover';
import Dashboard from './components/Dashboard';
import New from './components/New';
import Share from './components/Share';
import Poll from './components/Poll';

import requireAuth from './utils/requireAuth';
import redirectToDashboard from './utils/redirectToDashboard';

import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Main} > 
      <IndexRoute component={Login} onEnter={redirectToDashboard} /> {/* if the user goes to / and is logged in, redirect to dashboard */}
      <Route path="signup" component={Signup} onEnter={redirectToDashboard} />
      <Route path="recover" component={Recover} onEnter={redirectToDashboard} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} /> 
      <Route path="new" component={New} onEnter={requireAuth} />
      <Route path="share/:pollId" component={Share} onEnter={requireAuth} />
      <Route path="poll/:pollId" component={Poll} />
    </Route>
  </Router>,
  document.getElementById('root')
);
