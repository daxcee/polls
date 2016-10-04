import React from 'react';
import firebaseApp from '../utils/firebase';

class Poll extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            option1Count: 0,
            option2Count: 0
        };
    }

    componentWillMount() {
        const poll = firebaseApp.database().ref('polls/' + this.props.params.pollId);
		
        poll.on('value', ((snapshot) => {
		  this.setState({ option1Count: snapshot.option1Count, option2Count: snapshot.option2Count });
          console.log(this.state);
        }));
    }

    render() {
        return (
            <div>
                <p>op 1: {this.state.option1Count}</p>
                <p>op 2: {this.state.option2Count}</p>
            </div>
        );
    }
}

export default Poll;
