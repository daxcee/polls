import React from 'react';
import firebaseApp from '../utils/firebase';
import { browserHistory } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class Update extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            options: [],
            originalCount: 0
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.formIsInvalid = this.formIsInvalid.bind(this);
    }

    componentWillMount() {

        const pollRef = firebaseApp.database().ref(`polls/${this.props.params.pollId}`);
        pollRef.on('value', ((snapshot) => {

            const _this = this;
            const dbPoll = snapshot.val();

            const options = Object.keys(dbPoll).reduce((a, key) => {

                if (key !== 'title') {
                    a.push({ option: [key], optionError: '' }); //[key]is es6 computed property name
                }
                return a;
            }, []);

            //to start with a new option
            options.push({ option: '', optionError: '' });

            _this.setState({ title: dbPoll.title, options: options, originalCount: options.length - 1 })

        }));

    }

    handleOptionChange(i, e) {

        let options = this.state.options;
        options[i].option = e.target.value;
        this.setState({ options: options });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.formIsInvalid()) {
            return;
        }

        const newOptionsArray = this.state.options.reduce((a, op, i) => {
            if (i >= this.state.originalCount) {
                const key = op.option.trim();
                a.push(key);
            }

            return a;
        }, [])

        var updates = {};

        newOptionsArray.forEach(option => {
            updates[`polls/${this.props.params.pollId}/${option}`] = 0;
        });

        firebaseApp.database().ref().update(updates);

        browserHistory.push(`/poll/${this.props.params.pollId}`);
    }

    handleAddOption() {

        let options = this.state.options;
        options.push({ option: '', optionError: '' });

        this.setState({ options: options });
    }

    render() {

        let options = this.state.options.map((option, i) => {
            return (
                <div key={i}>
                    <br />
                    <TextField
                        floatingLabelText={`Option ${i + 1}`}
                        value={this.state.options[i].option}
                        onChange={this.handleOptionChange.bind(this, i)}
                        errorText={this.state.options[i].optionError}
                        disabled={i < this.state.originalCount ? true : false}
                        />
                </div>
            );
        });

        return (
            <div className="row">
                <div className="col-sm-12 text-xs-center">

                    <h3>Update Poll</h3>

                    <form onSubmit={this.handleSubmit}>

                        <TextField
                            floatingLabelText="Title"
                            value={this.state.title}
                            onChange={this.handleTitleChange}
                            errorText={this.state.titleError}
                            disabled={true}
                            />

                        {options}

                        <br />
                        <FloatingActionButton
                            mini={true}
                            secondary={true}
                            onTouchTap={this.handleAddOption} >
                            <ContentAdd />
                        </FloatingActionButton>

                        <br /><br />
                        <RaisedButton
                            label="Update"
                            type="submit"
                            primary={true}
                            className="buttonWidth"
                            />
                    </form>

                </div>
            </div>
        );
    }

    //firebase keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"
    //option must not be named "title", TODO: better data structure in firebase
    //options must be different, firebase removes dups keys automatically
    //more robust validation is done firebase-side
    formIsInvalid() {

        let isInvalid = false;
        const regex = /[\.#\$\/\[\]]/;

        this.state.options.forEach((o, i) => {

            if (i >= this.state.originalCount) {
                let options = this.state.options;
                let thisOption = o.option.trim();

                if (thisOption.length === 0) {
                    options[i] = { option: thisOption, optionError: 'This option must not be empty.' }
                    this.setState({ options: options });
                    isInvalid = true;
                } else if (thisOption.match(regex)) {
                    options[i] = { option: thisOption, optionError: `Options can't contain ".", "#", "$", "/", "[", or "]"` }
                    this.setState({ options: options });
                    isInvalid = true;
                } else {

                    if (thisOption === 'title') { //can't have option with key "title"
                        thisOption = 'Title';
                    }

                    options[i] = { option: thisOption, optionError: '' }
                    this.setState({ options: options });
                }
            }

        });

        return isInvalid;
    }
}

export default Update;
