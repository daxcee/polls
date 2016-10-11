import React from 'react';
import firebaseApp from '../utils/firebase';
import { browserHistory } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedIn: (null !== firebaseApp.auth().currentUser) //currentUser is null when not loggedin 
        };
    }

    componentWillMount() {
        firebaseApp.auth().onAuthStateChanged(user => {
       
            this.setState({
                loggedIn: (null !== user) //user is null when not loggedin 
            })

            // if (user) {
            //     console.log("Logged IN", user);
            // } else {
            //     console.log('Not logged in');
            // }
        });
    }

    handleLogout() {
        firebaseApp.auth().signOut().then(() => {
            console.log("sign out succesful");
            browserHistory.push('/');
        }, (error) => {
            console.log(error);
        });
    }

    render() {

        let nav;

        if (this.state.loggedIn) {

            nav = (
                <div className="row">
                    <div className="col-sm-6">
                        <h5 className="display-5 logo"><a href="/dashboard">dashboard</a></h5>
                    </div>
                    <div className="col-sm-6 text-xs-right">
                        {firebaseApp.auth().currentUser ? firebaseApp.auth().currentUser.email : '' }
                        <FlatButton 
                            onClick={this.handleLogout}
                            label="Logout"
                            secondary={true}
                        />
                    </div>
                </div>
            );
        }

        return (
            <MuiThemeProvider>
                <div className="container">

                    {nav}

                    {this.props.children}
                    
                    <div className="row">
                        <div className="col-sm-12 text-xs-center">    

                        <br /><br />

                            <FlatButton
                                label="Source Code"
                                href="https://github.com/sebnun/polls"
                                icon={<FontIcon className="fa fa-github" />}
                            />
                        </div>
                    </div>
                    
                </div>
            </MuiThemeProvider>

        );
    }
}

export default App;
