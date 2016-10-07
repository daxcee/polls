/*global componentHandler*/

import React from 'react';
import firebaseApp from '../utils/firebase';
import { browserHistory } from 'react-router';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email.trim();
    const password = this.state.password.trim();

    firebaseApp.auth().signInWithEmailAndPassword(email, password).then((user) => {
      browserHistory.push('/dashboard');
    }).catch((error) => {
      document.getElementById('errorMessage').innerText = error.message;
      console.log(error);
    });;
  }

  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  render() {
    return (
      <div className="mdl-grid" style={{ maxWidth: 800 }}>
        <div className="mdl-cell mdl-cell--12-col center">

          <h1><a href="/">Polls</a></h1>


          <p id="errorMessage"></p>

          <form onSubmit={this.handleSubmit}>

            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="emailInput" value={this.state.email} onChange={this.handleEmailChange} />
              <label className="mdl-textfield__label" htmlFor="emailInput">Email</label>
            </div>

            <br />

            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="password" id="passwordInput" value={this.state.password} onChange={this.handlePasswordChange} />
              <label className="mdl-textfield__label" htmlFor="passwordInput">Password</label>
            </div>



            <p>
              <button
                type="submit"
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent homeButton">
                Login
              </button>
            </p>

          </form>

          <a className="mdl-button mdl-js-button" href="https://github.com/sebnun/polls" ><i className="fa fa-github" aria-hidden="true"></i> Source Code</a>

        </div>

      </div>
    );
  }
}


export default Login;
