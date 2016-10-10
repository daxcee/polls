import React from 'react';
import firebaseApp from '../utils/firebase';
import * as firebase from 'firebase'; //needed for fb, google providers
import { browserHistory } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

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
      console.log('Google login success');
      browserHistory.push('/dashboard');
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (

        <div className="row">
          <div className="col-sm-12 text-xs-center">

            <h1 className="display-1"><a href="/">Polls</a></h1>

            <h4 className="display-4">Create, share and vote on polls fast and easy.View Results in real time!</h4>

            <br /><br/>
            <RaisedButton
              label="Login with Facebook"
              onTouchTap={this.handleFacebook}
              secondary={true}
              icon={<FontIcon className="fa fa-facebook-f" />}
              className="buttonWidth"
              />

            <br /><br/>
            <RaisedButton
              label="Login with Google"
              onTouchTap={this.handleGoogle}
              secondary={true}
              icon={<FontIcon className="fa fa-google" />}
              className="buttonWidth"
              />

            <br /><br/>
            <RaisedButton
              label="Login with Email"
              href="/login"
              secondary={true}
              icon={<FontIcon className="fa fa-envelope-o" />}
              className="buttonWidth"
              />

            <br /><br/>
            <RaisedButton
              label="Sign Up"
              href="/signup"
              primary={true}
              className="buttonWidth"
              />

          </div>
        </div>
    
    );
  }
}


export default Home;
