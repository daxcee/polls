import React from 'react';
import firebaseApp from '../utils/firebase';
import * as firebase from 'firebase'; //needed for fb, google providers
import { browserHistory } from 'react-router';

class Home extends React.Component {

  handleFacebook(e) {
    e.preventDefault();
    const provider = new firebase.auth.FacebookAuthProvider();
    firebaseApp.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      //var user = result.user;
      console.log('Facebook login success');
      browserHistory.push('/dashboard');
    }).catch((error) => {
      console.log(error);
    });
  }

  handleGoogle(e) {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebaseApp.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      //var token = result.credential.accessToken;
      // The signed-in user info.
      //var user = result.user;
      console.log('Google login success');
      browserHistory.push('/dashboard');
    }).catch((error) => {
      console.log(error);
    });
  }

  handleEmail(e) {
    browserHistory.push('/login');
  }

  handleSignup(e) {
    browserHistory.push('/signup');
  }

  render() {
    return (

      <div className="mdl-grid" style={{ maxWidth: 800 }}>
        <div className="mdl-cell mdl-cell--12-col center">

          <h1><a href="/">Polls</a></h1>

          <h2>Create, share and vote on polls fast and easy.View Results in real time!</h2>

          <p>
            <button
              className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored homeButton"
              onClick={this.handleFacebook}>
              <i className="fa fa-facebook-f" aria-hidden="true"></i>
              &nbsp; Login with Facebook
            </button>
          </p>
          <p>
            <button
              className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored homeButton"
              onClick={this.handleGoogle}>
              <i className="fa fa-google" aria-hidden="true"></i>
              &nbsp; Login with Google
            </button>
          </p>
          <p>
            <button
              className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored homeButton"
              onClick={this.handleEmail}>
              Login with Email
            </button>
          </p>
          <p>
            <button
              className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent homeButton"
              onClick={this.handleSignup}>
              Sign Up
            </button>
          </p>


          <a className="mdl-button mdl-js-button" href="https://github.com/sebnun/polls" ><i className="fa fa-github" aria-hidden="true"></i> Source Code</a>


        </div>
      </div>
    );
  }
}


export default Home;
