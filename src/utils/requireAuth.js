import firebaseApp from './firebase';

export default (nextState, replace) => {
    let user = firebaseApp.auth().currentUser;
    if (!user) {
        replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}