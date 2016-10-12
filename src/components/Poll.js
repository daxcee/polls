import React from 'react';
import firebaseApp from '../utils/firebase';

import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import { PieChart, Pie, Tooltip } from 'recharts';
import Helmet from "react-helmet";

class Poll extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            options: [], //of the form [{'some option': 34}]
            voted: localStorage.getItem(this.props.params.pollId) ? true : false,
            showSnackbar: false
        };

        //this.handleVote = this.handleVote
    }

    componentWillMount() {
        const pollRef = firebaseApp.database().ref(`polls/${this.props.params.pollId}`);
		
        pollRef.on('value', ((snapshot) => {

            const _this = this;
            const dbPoll = snapshot.val();
            
            const options = Object.keys(dbPoll).reduce((a, key) => {

                if(key !== 'title') {
                    a.push({ [key]: dbPoll[key] }); //[key]is es6 computed property name
                }
                return a;
            }, [] );

            _this.setState({ title: dbPoll.title, options: options})
        }));
    }

    handleVote(option) {
        let currentCount = this.state.options.filter(o => {
            return o.hasOwnProperty(option);
        })[0][option];

        firebaseApp.database().ref().update({ [`polls/${this.props.params.pollId}/${option}`]: currentCount += 1 })
        localStorage.setItem(this.props.params.pollId, 'true');
        this.setState({ voted: true, showSnackbar: true });
    }

    render() {

        let isAuthUser = false;
        for (let key in localStorage) {
            if (key.startsWith("firebase:authUser:")) {
                isAuthUser = true;
            }
        }

        let addOptionUI;
        if (isAuthUser) {
            addOptionUI =  (    
                <div>               
                    <FloatingActionButton 
                        mini={true} 
                        secondary={true} 
                        href={`/update/${this.props.params.pollId}`}
                         >
                         <ContentAdd />
                    </FloatingActionButton>
                </div>
            );
        }

        //const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300}];
       const data = this.state.options.map(option => {
           return { name: Object.keys(option)[0], value: option[Object.keys(option)[0]] }
       });

        let optionsUI = this.state.options.map(option => {
            return (
                <div key={Object.keys(option)[0]}>
                    <RaisedButton 
                        label={Object.keys(option)[0] + ' ' + option[Object.keys(option)[0]]} 
                        fullWidth={true} 
                        onTouchTap={() => this.handleVote(Object.keys(option)[0])}
                        disabled={this.state.voted}
                    />
                    <br /><br />
                </div>
            );
        });

        return (
            <div className="row">
                <div className="col-sm-12 text-xs-center">

                    <Helmet title={this.state.title} /> 

                    <Snackbar
                        open={this.state.showSnackbar}
                        message="Thanks for your vote!"
                        autoHideDuration={4000}
                    />
<Paper>
<br /><br />
                    <h2>{this.state.title}</h2>

                    {optionsUI}

                    {addOptionUI}

                    <PieChart width={800} height={400}>
                        <Pie isAnimationActive={false} data={data} cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
                        <Tooltip/>
                    </PieChart>

                    <br /><br />
                    </Paper>
                </div>
            </div>
        );
    }
}

export default Poll;
