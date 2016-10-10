import React from 'react';
import { Link } from 'react-router';
import firebaseApp from '../utils/firebase';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
// import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
//import RefreshIndicator from 'material-ui/RefreshIndicator';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dialogOpen: false,
            poll2Delete: '',
            polls: [],
            loading: true
        };

        this.handleClose = this.handleClose.bind(this);
        //this.handleOpen = this.handleOpen.bind(this); bind in ontapctouch call
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {

        let uid;

        //this key exists if the user is logged in, when logged out is removed
        //the user should be authoraized when seeing the dashboard
        //use it to avoid waiting for firebaseApp.auth().onAuthStateChanged
        for (let key in localStorage) {
            if (key.startsWith('firebase:authUser:')) {
                uid = JSON.parse(localStorage.getItem(key)).uid;
            }
        }



        const userPollsRef = firebaseApp.database().ref(`user-polls/${uid}`);
        userPollsRef.on('value', ((userPollsSnapshot) => {

            let polls = [];
            let _this = this;

            //set here, cause if no polls remain after last delete, the pollRef wont get called
            _this.setState({ polls: polls, loading: false });


            userPollsSnapshot.forEach((pollIdSnap) => {

                const pollId = pollIdSnap.key;

                const pollRef = firebaseApp.database().ref(`polls/${pollId}`);
                pollRef.on('value', ((snapshot) => {

                    //snapshop can be null after deleting
                    if (snapshot.val()) {
                        polls.push({ title: snapshot.val().title, id: pollId });
                        _this.setState({ polls: polls });
                    }

                }));

            });

        }));
    }

    handleOpen(pollId) {
        this.setState({ dialogOpen: true, poll2Delete: pollId });
    }

    handleClose() {
        this.setState({ dialogOpen: false, poll2Delete: '' });
    }

    handleDelete() {

        // update to null to delete
        var updates = {};
        updates['/polls/' + this.state.poll2Delete] = null;
        updates['/user-polls/' + firebaseApp.auth().currentUser.uid + '/' + this.state.poll2Delete] = null;

        firebaseApp.database().ref().update(updates);

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

        let pollsUIs = this.state.polls.map((poll) => {
            return (
                <p key={poll.id}>
                    <Link to={`/poll/${poll.id}/share`}>{poll.title}</Link>
                    <IconButton
                        iconClassName="fa fa-trash"
                        tooltip={<span>Delete</span>}
                        onTouchTap={() => this.handleOpen(poll.id) }
                        />
                </p>
            );
        });

        return (


            <div className="row">
                <div className="col-sm-12 text-xs-center">

                    <h3>Your Polls</h3>

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

                    { this.state.loading ? <p>Loading ...</p> : '' }

                    {pollsUIs}


                </div>
            </div>
        );
    }
}


export default Dashboard;
