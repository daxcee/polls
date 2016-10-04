import React from 'react';
import firebaseApp from '../utils/firebase';
import { browserHistory } from 'react-router';

class New extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            option1: '',
            option2: ''
        };

        this.handleOption1Change = this.handleOption1Change.bind(this);
        this.handleOption2Change = this.handleOption2Change.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value });
    }

    handleOption1Change(e) {
        this.setState({ option1: e.target.value });
    }

    handleOption2Change(e) {
        this.setState({ option2: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const pollData = {
            title: this.state.title.trim(),
            option1: this.state.option1.trim(),
            option2: this.state.option2.trim(),
            option1Count: 0,
            option2Count: 0
        };

        //user ID
        const uid = firebaseApp.auth().currentUser.uid;

        // Get a key for a new Poll.
        const newPollKey = firebaseApp.database().ref().child('polls').push().key;

        // Write the new poll's data simultaneously in the polls list and the user's polls list.
        var updates = {};
        updates['/polls/' + newPollKey] = pollData;
        updates['/user-polls/' + uid + '/' + newPollKey] = true;

        firebaseApp.database().ref().update(updates);
        
        browserHistory.push(`/share/${newPollKey}`);
    }
    render() {
        return (
            <div>
                <p>New</p>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.title} onChange={this.handleTitleChange} placeholder="Enter Title" />
                    <input type="text" value={this.state.option1} onChange={this.handleOption1Change} placeholder="Enter Option 1" /><br/>
                    <input type="text" value={this.state.option2} onChange={this.handleOption2Change} placeholder="Enter Option 2" /><br/>
                    <button type="submit">Submit</button>
                </form> 
            </div>
        );
    }
}

export default New;
