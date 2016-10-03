import React from 'react';
import firebaseApp from '../utils/firebase';
import * as firebase from 'firebase';
import { Link } from 'react-router';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: ''};

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

    firebaseApp.auth().signInWithEmailAndPassword(email, password).catch((error) => {
    		// Handle Errors here.
    		alert(`Opps ... ${error.message}`);
    });
  }

  handleFacebook(e) {
    e.preventDefault();
    const provider = new firebase.auth.FacebookAuthProvider();
    firebaseApp.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      //var user = result.user;
      console.log('Facebook login success')
    }).catch((error) => {
      alert(`Facebook sign in error: ${error.message}`);
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
      console.log('Google login success')
    }).catch((error) => {
      alert(`Google sign in error: ${error.message}`);
    });
  }


  render() {
    return (
      <div>
        <p>Login</p>
        <button onClick={this.handleFacebook}>Login with Facebook</button><br />
        <button onClick={this.handleGoogle}>Login with Google</button><br />
        <p>Or Login with Email</p>
        <form onSubmit={this.handleSubmit}>
          	<input type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder="Enter Email" />
          	<input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Enter Password" /><br/>
          	<button type="submit">Submit</button>
        </form> 
        <Link to="/signup">Signup</Link><br />
        <Link to="recover">Passwprd Recovery</Link>
      </div>
    );
  }
}


export default Login;
