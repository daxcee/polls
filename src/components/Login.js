import React, { Component } from 'react';
import * as firebase from 'firebase';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const email = this.refs.email.value;
        const pw = this.refs.pw.value;
        const self = this;

        firebase.auth().signInWithEmailAndPassword(email, pw).then((result) => {
            const location = self.props.location;

            if(location.state && location.state.nextPathname) {
                self.context.router.replace(location.state.nextPathname);
            } else {
                self.context.router.replace('/dashboard');
            }

            console.log('user signed in');
        }).catch((error) => {
            this.setState({ error: error });
        })
    }

    render() {
        const errors = this.state.error ? <p> {this.state.error} </p> : '';

        return (
            <div className="col-sm-6 col-sm-offset-3">
                <h1> Login </h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label> Email </label>
                        <input className="form-control" ref="email" placeholder="Email"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input ref="pw" type="password" className="form-control" placeholder="Password" />
                    </div>
                    {errors}
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}

Login.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Login;