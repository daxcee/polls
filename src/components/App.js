import React from 'react';
//import firebaseApp from '../utils/firebase';
//import { browserHistory } from 'react-router'

class App extends React.Component {

    // why shoudl I keep state here?
    //if user is logged in and goes to / , redurect to dashboard from router or home component

    /*
    constructor(props) {
        super(props);

        this.state = { 
            loggedIn: firebaseApp.auth().currentUser ? true : false //currentUser is null when not logged in
        };
    }

    componentWillMount() {
        let _this = this;
        firebaseApp.auth().onAuthStateChanged((user) => {

            console.log('on onAuthStateChanged the user is:')
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
*/
    render() {
        return (

            this.props.children

        );
    }
}

export default App;
