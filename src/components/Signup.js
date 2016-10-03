import React from 'react';
import firebaseApp from '../utils/firebase';

class Signup extends React.Component {
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

    firebaseApp.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
    	// Handle Errors here.
    	alert(`Opps ... ${error.message}`);
    });
  }

  render() {
    return (
      <div>
        <p>Signup</p>
        <form onSubmit={this.handleSubmit}>
          	<input type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder="Enter Email" />
          	<input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Enter Password" /><br/>
          	<button type="submit">Submit</button>
        </form> 
      </div>
    );
  }
}


export default Signup;
