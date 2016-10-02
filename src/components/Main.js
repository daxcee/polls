import React from 'react';
import { Link } from 'react-router';
import * as firebase from 'firebase';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: (null !== firebase.auth().currentUser)
        };
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(firebaseUser => {

            this.setState({
                loggedIn: (null !== firebaseUser)
            });

            if (firebaseUser) {
                console.log('Logged IN', firebaseUser);
            } else {
                console.log('NOT logged in');
            }

        });
    }

    render() {
        let loginOrOut;
        let register;

        if (this.state.loggedIn) {
            loginOrOut = <li><Link to="/logout" className="navbar-brand">Logout</Link></li>;
            register = null;
        } else {
            loginOrOut = <li><Link to="/login" className="navbar-brand">Login</Link></li>;
            register = <li><Link to="/register" className="navbar-brand">Register</Link></li>;
        }

        return (
            <span>
                <nav className="navbar navbar-default navbar-static-top">
                    <div className="container">
                        <div className="navbar-header">
                            <Link to="/" className="navbar-brand">
                                PROJECT NAME
                            </Link>
                        </div>
                        <ul className="nav navbar-nav pull-right">
                            <li>
                                <Link to="/" className="navbar-brand">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="navbar-brand">
                                    Dashboard
                                </Link>
                            </li>
                            {register}
                            {loginOrOut}
                        </ul>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        {this.props.children}
                    </div>
                </div>
            </span>
        )
    }
}

export default Main;