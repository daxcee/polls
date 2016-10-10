import React from 'react';
import { Link } from 'react-router';
import firebaseApp from '../utils/firebase';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
// import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dialogOpen: false,
            poll2Delete: '',
            polls: [
                { title: 'test title', id: '1261256' }
            ],
            loading: true
        };

        this.handleClose = this.handleClose.bind(this);
        //this.handleOpen = this.handleOpen.bind(this); bind in ontapctouch call
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {

        //this key exists if the user is logged in, when logged out is removed
        //the user should be authoraized when seeing the dashboard
        //use it to avoid waiting for firebaseApp.auth().onAuthStateChanged

        let uid;

        for (let key in localStorage) {
            if (key.startsWith("firebase:authUser:")) {
                uid = JSON.parse(localStorage.getItem(key)).uid;
            }
        }

        const userPolls = firebaseApp.database().ref('user-polls/' + uid);
		
        userPolls.on('value', ((snapshot) => {
		  //this.setState({ 
          console.log(snapshot.val());
        }));
    }

    handleOpen(pollId) {
        this.setState({ dialogOpen: true, poll2Delete: pollId });
    }

    handleClose() {
        this.setState({ dialogOpen: false, poll2Delete: '' });
    }

    handleDelete() {
        console.log('delte ' + this.state.poll2Delete);
        this.setState({ dialogOpen: false, poll2Delete: '' });
    }

    render() {

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Delete"
                primary={true}
                onTouchTap={this.handleDelete}
            />,
        ];

        return (
           
 
            <div className="row">
                <div className="col-sm-12 text-xs-center">      

                    <h3>Your Polls</h3>

                    <div className="text-xs-left">

                        <Dialog
                            actions={actions}
                            modal={false}
                            open={this.state.dialogOpen}
                            onRequestClose={this.handleClose}
                            >
                            Delete Poll?
                        </Dialog>


                        <RaisedButton
                            label="New Poll"
                            href="/new"
                            primary={true}
                        />

                        <p key={23498723}>
                            <Link to="/poll/23498723/share">Coke vs POeso</Link> 
                            <IconButton 
                                iconClassName="fa fa-trash" 
                                tooltip={<span>Delete</span>}
                                onTouchTap={() => this.handleOpen(23498723)}
                            />
                        </p>

                    </div>
                </div>
            </div>
        );
    }
}


export default Dashboard;
