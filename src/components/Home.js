import React from 'react';
import firebaseApp from '../utils/firebase';
import * as firebase from 'firebase'; //needed for fb, google providers
import { Link, browserHistory } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import Helmet from "react-helmet";

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

            <Helmet title="Home" />

            <Paper>

              <br /><br />
              <h2>Create and share polls, fast and easy. View results in real time!</h2>

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
              <Link to="/login">
              <RaisedButton
                label="Login with Email"
                secondary={true}
                icon={<FontIcon className="fa fa-envelope-o" />}
                className="buttonWidth"
                />
                </Link>
              <br /><br/>
              <Link to="/signup">
              <RaisedButton
                label="Sign Up"
                primary={true}
                className="buttonWidth"
                />
                </Link>
                <br /><br/>
                <br /><br/>
            </Paper>

          </div>
        </div>
    
    );
  }
}


export default Home;
