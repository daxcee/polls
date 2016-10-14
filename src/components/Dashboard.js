import React from 'react';
import { Link } from 'react-router';
import { firebaseApp, getLocalUserId } from '../utils/firebase';
import Helmet from "react-helmet";

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Loading from './Loading';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dialogOpen: false,
            loading: true,
            polls: [] //items like { id: 34324, title: 'sdf'}
        };

        this.poll2Delete = '';
        this.poll2DeleteTitle = ''

        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {
        const uid = getLocalUserId();

        this.userPollsRef = firebaseApp.database().ref(`user-polls/${uid}`);

        //check if user has no polls to quit loading indicator
        this.userPollsRef.once('value').then(snapshot => {
            if (!snapshot.hasChildren()) {
                this.setState({ loading: false });
            }
        });

        this.userPollsRef.on('child_added', ((newPollIdSnapshot) => {
            const pollId = newPollIdSnapshot.key;

            firebaseApp.database().ref(`polls/${pollId}/title`).once('value').then(snapshot => {
                const title = snapshot.val();

                const polls = this.state.polls;
                polls.push({ title: title, id: pollId })

                this.setState({
                    polls: polls,
                    loading: false
                });
            });

        })).bind(this);

        this.userPollsRef.on('child_removed', ((removedPollIdSnapshot) => {
            const pollId = removedPollIdSnapshot.key;
            const polls = this.state.polls.filter(poll => poll.id !== pollId);

            this.setState({
                polls: polls
            });

        })).bind(this);
    }

    componentWillUnmount() {
        this.userPollsRef.off();
    }

    handleOpen(pollId) {
        this.setState({ dialogOpen: true });
        this.poll2Delete = pollId;
        this.poll2DeleteTitle = this.state.polls.find(poll => poll.id === this.poll2Delete).title;
    }

    handleClose() {
        this.setState({ dialogOpen: false });
    }

    handleDelete() {
        // updating to null deletes
        const updates = {};
        updates[`/polls/${this.poll2Delete}`] = null;
        updates[`/user-polls/${firebaseApp.auth().currentUser.uid}/${this.poll2Delete}`] = null;

        firebaseApp.database().ref().update(updates);

        this.setState({ dialogOpen: false });
    }

    render() {

        const actions = [
            <FlatButton
                label="Cancel"
                primary={false}
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
                <div key={poll.id} >

                    <IconButton
                        iconClassName="fa fa-trash"
                        tooltip={<span>Delete</span>}
                        onTouchTap={() => this.handleOpen(poll.id)}

                        />
                    <Link to={`poll/${poll.id}`}>
                        <FlatButton
                            label={poll.title}
                            style={{ textAlign: 'left', width: '50%' }}
                            />
                    </Link>
                    <Divider />

                </div>
            );
        });

        return (
            <div className="row">
                <div className="col-sm-12 text-xs-center">

                    <Helmet title="Dashboard" />

                    <Paper>

                        <br />
                        <h2>Your Polls</h2>
                        <br />

                        <Dialog
                            actions={actions}
                            modal={false}
                            open={this.state.dialogOpen}
                            onRequestClose={this.handleClose}
                            >
                            Delete "{this.poll2DeleteTitle}"?
                    </Dialog>

                        <Link to="new">
                            <RaisedButton
                                label="New Poll"
                                primary={true}
                                />
                        </Link>
                        <br /><br />

                        {pollsUIs}

                        <Loading loading={this.state.loading} />

                        <br /><br />
                    </Paper>
                </div>
            </div>
        );
    }
}


export default Dashboard;
