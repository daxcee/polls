import React from 'react';
import firebaseApp from '../utils/firebase';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email.trim();

    firebaseApp.auth().sendPasswordResetEmail(email).then(() => {
        // Email sent.
        alert("Please check your email "+email+" for instructions ");
      }, (error) => {
        alert("sorry an error has occured, Please try again")
      });
  }

  render() {
    return (
      <div>
        <p>Recover email</p>
        <form onSubmit={this.handleSubmit}>
          	<input type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder="Enter Email" />
          	<button type="submit">Submit</button>
        </form> 
      </div>
    );
  }
}


export default Signup;
