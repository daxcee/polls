import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';

import './index.css';


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App} > 
      <IndexRoute component={Home} />
      <Route path="dashboard" component={Dashboard} /> 
      <Route path="signup" component={Signup} />
      <Route path="login" component={Login} />
      {/*
      <Route path="recover" component={Recover} onEnter={redirectToDashboard} />
      
      <Route path="new" component={New} onEnter={requireAuth} />
      <Route path="share/:pollId" component={Share} onEnter={requireAuth} />
      <Route path="poll/:pollId" component={Poll} />*/}
    </Route>
  </Router>,
  document.getElementById('root')
);

