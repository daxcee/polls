import React from 'react';
import { Link, browserHistory } from 'react-router';
import { firebaseApp } from '../utils/firebase';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: '#DC3912',
        accent1Color: '#FF9900'
    }
});

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
        });
    }

    handleLogout() {
        firebaseApp.auth().signOut().then(() => {
            //console.log("sign out succesful");
            browserHistory.push('/');
        }, (error) => {
            console.log(error);
        });
    }

    render() {

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="container">

                    <div className="row">

                        <div className="col-sm-4">
                            <br />
                            {this.state.loggedIn ?
                                <Link to="dashboard">
                                    <FlatButton
                                        label="My Polls"
                                        primary={true}
                                        />
                                </Link>
                                : ''}
                            <br /><br />
                        </div>

                        <div className="col-sm-4 text-xs-center">
                            <br />
                            <Link to={this.state.loggedIn ? 'dashboard' : '/'} >
                                <FlatButton
                                    label="Poolster"
                                    labelStyle={{ fontFamily: 'Monoton', fontSize: "25px", textShadow: "2px 2px #ccc", color: "#DC3912" }}
                                    />
                            </Link>
                            <br /><br />
                        </div>

                        <div className="col-sm-4 text-xs-right">
                            <br />
                            {this.state.loggedIn ?
                                <FlatButton
                                    onClick={this.handleLogout}
                                    label="Logout"
                                    secondary={true}
                                    />
                                : ''}
                            <br /><br />
                        </div>

                    </div>

                    {this.props.children}

                    <div className="row">
                        <div className="col-sm-12 text-xs-center">
                            <br />
                            <a href="https://github.com/sebnun/polls">
                                <FlatButton
                                    label="Source Code"
                                    icon={<FontIcon className="fa fa-github" />}
                                    />
                            </a>
                        </div>
                    </div>

                </div>
            </MuiThemeProvider>

        );
    }
}

export default App;
