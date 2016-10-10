import firebaseApp from './firebase';

export default (nextState, replace) => {

    if (!firebaseApp.auth().currentUser) {
        let hasLocalStorageUser = false;
        for (let key in localStorage) {
            if (key.startsWith("firebase:authUser:")) {
                hasLocalStorageUser = true;
            }
        }
        if (!hasLocalStorageUser) {
            replace({
                pathname: '/',
                state: { nextPathname: nextState.location.pathname }
            });
        }
    }


}