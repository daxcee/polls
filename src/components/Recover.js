import React from 'react';
import firebaseApp from '../utils/firebase';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Recover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
      currentStep: 1
    };

    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleEmailSubmit(e) {
    e.preventDefault();
    const email = this.state.email.trim();

    firebaseApp.auth().sendPasswordResetEmail(email).then(() => {
      this.setState({ currentStep: 2 });
    }).catch((error) => {
    
        this.setState({ emailError: error.message });
        console.log(error);
    });
  }

  render() {

      let step = (
          <form onSubmit={this.handleEmailSubmit}>

            <p>We'll send you an email to reset your password.</p>

              <TextField
                floatingLabelText="Email"
                value={this.state.email}
                onChange={this.handleEmailChange}
                errorText={this.state.emailError}
                />

              <br /><br/>
              <RaisedButton
                label="Send Verification Email"
                type="submit"
                primary={true}
                className="buttonWidth"
                />

            </form>
      );
    
    if (this.state.currentStep === 2) {

        step = (
          <p>Done! Follow the link in the email to change your password</p>
      );
    }

    return (
        <div className="row">
          <div className="col-sm-12 text-xs-center">

            <h1 className="display-1"><a href="/">Polls</a></h1>

            {step}

          </div>
        </div>
    );
  }
}


export default Recover;
