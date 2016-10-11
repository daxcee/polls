import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import requireAuth from './utils/requireAuth';

import App from './components/App';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import Recover from './components/Recover';
import New from './components/New';
import Poll from './components/Poll';
import Update from './components/Update';

import './index.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}> 
      <IndexRoute component={Home} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} /> 
      <Route path="signup" component={Signup} />
      <Route path="login" component={Login} />
      <Route path="recover" component={Recover} />
      <Route path="new" component={New} onEnter={requireAuth} />
      <Route path="update/:pollId" component={Update} onEnter={requireAuth} />
      <Route path="poll/:pollId" component={Poll} />
    </Route>
  </Router>,
  document.getElementById('root')
);

