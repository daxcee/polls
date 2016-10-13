import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBCl_Bof8W2baR1-6mC5QOKQe06UfPwTNk",
    authDomain: "polls-66eef.firebaseapp.com",
    databaseURL: "https://polls-66eef.firebaseio.com",
    storageBucket: "polls-66eef.appspot.com",
};

export const firebaseApp = firebase.initializeApp(config);

export function getLocalUserId() {
    let uid;

    //this key exists if the user is logged in, when logged out is removed
    //the user should be authoraized when seeing the dashboard
    //use it to avoid waiting for firebaseApp.auth().onAuthStateChanged
    for (let key in localStorage) {
        if (key.startsWith('firebase:authUser:')) {
            uid = JSON.parse(localStorage.getItem(key)).uid;
            break;
        }
    }

    return uid;
}
