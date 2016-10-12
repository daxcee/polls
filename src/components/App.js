import React from 'react';
import firebaseApp from '../utils/firebase';
import { browserHistory } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


// const muiTheme = getMuiTheme({
//     fontFamily: 'Roboto, sans-serif',
//     palette: {
//         primary1Color: lightBlue700,
//         primary2Color: lightBlue800,
//         primary3Color: lightBlue900,
//         textColor: darkBlack,
//         accent1Color: '#6C6D6E',
//         accent2Color: yellowA700,
//         accentYellow: yellowA700,
//         accentOrange: orangeA400,
//         canvasColor: blueGrey50,
//         titleColor: lightBlue100,
//         iconColor: '#6C6D6E',
//         white: '#FFFFFF'
//     },
//     toolbar: {
//         iconColor: darkBlack,
//         backgroundColor: 'transparent'
//     }
// });

const muiTheme = getMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: '#DF696E',
        accent1Color: '#EE6E73'
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
            console.log("sign out succesful");
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
                                <FlatButton 
                                    label="My Polls"
                                    href="/dashboard"
                                    primary={true}
                                /> 
                            : ''}
                            <br /><br />
                        </div>

                        <div className="col-sm-4 text-xs-center">
                            <br />
                            <FlatButton 
                                label="Poolster" 
                                href={this.state.loggedIn ? '/dashboard' : '/'} 
                                labelStyle={{ fontFamily:'Monoton', fontSize:"25px", textShadow:"2px 2px #ccc", color: "#DF696E" }} 
                            />
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
                            : '' }
                            <br /><br />
                        </div>
                        
                    </div>

                    {this.props.children}
                    
                    <div className="row">
                        <div className="col-sm-12 text-xs-center">    

                        <br />

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
