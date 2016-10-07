import React from 'react';
import { browserHistory } from 'react-router';
import firebaseApp from '../utils/firebase';

class Dashboard extends React.Component {

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

            <div className="mdl-grid" style={{ maxWidth: 800 }}>
                <div className="mdl-cell mdl-cell--6-col">
                    <p><a href="/">Polls</a></p>
                </div>
                <div className="mdl-cell mdl-cell--6-col right">
                    {firebaseApp.auth().currentUser.email}
                    <button className="mdl-button mdl-js-button" onClick={this.handleLogout}>Logout</button>
                </div>

                <div className="mdl-cell mdl-cell--12-col center">

                    <ul className='mdl-list'>
                        <li className="mdl-list__item">
                            <span className="mdl-list__item-primary-content">
                                Coke vs Pepsi
                            </span>
                        </li>
                        <li className="mdl-list__item">
                            <span className="mdl-list__item-primary-content">
                                Coke vs Pepsi
                            </span>
                        </li>
                        <li className="mdl-list__item">
                            <span className="mdl-list__item-primary-content">
                                Coke vs Pepsi
                            </span>
                        </li>
                    </ul>

                    <a className="mdl-button mdl-js-button" href="https://github.com/sebnun/polls" ><i className="fa fa-github" aria-hidden="true"></i> Source Code</a>

                </div>
            </div>
        );
    }
}


export default Dashboard;
