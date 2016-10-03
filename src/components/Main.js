import React from 'react';
import { Link } from 'react-router';
import firebaseApp from '../utils/firebase';
import { browserHistory } from 'react-router'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loggedIn: false };

        this.signOut = this.signOut.bind(this);
    }

    componentWillMount() {
        let _this = this;
        firebaseApp.auth().onAuthStateChanged((user) => {

            console.log(user);

            if (user) {
                //if logged in...
                _this.setState({ loggedIn: true });
                browserHistory.push('/dashboard'); //after login, redirect to dashboard
            } else {
                //if not logged in...
                _this.setState({loggedIn: false});
            }
        });
    }

    signOut() {
        firebaseApp.auth().signOut().then(() => {
            console.log("sign out succesful");
            browserHistory.push('/');
        }, (error) => {
            console.log("an error happened");
        });
    }

    render() {

        return (
            <div>
                <ul>
                    <li>{this.state.loggedIn ? "Logged IN" : "Logged OUT"}</li>
                    <li><button onClick={this.signOut}>Logout</button></li>
                    <li><Link to="/">Login</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/new">New</Link></li>
                    <li><Link to="/share">Share</Link></li>
                    <li><Link to="/poll">Poll</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}

export default Main;
