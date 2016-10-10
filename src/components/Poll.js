import React from 'react';
import firebaseApp from '../utils/firebase';
//import Bar from './Bar';

class Poll extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
        };
    }

    componentWillMount() {
        const poll = firebaseApp.database().ref('polls/' + this.props.params.pollId);
		
        poll.on('value', ((snapshot) => {
		  //this.setState({ 
          console.log(snapshot.val());
        }));
    }

    render() {
        return (
            <div>
                
                {/*<p>op 1: {this.state.option1Count}</p>
                <p>op 2: {this.state.option2Count}</p>*/}
            </div>
        );
    }
}

export default Poll;
