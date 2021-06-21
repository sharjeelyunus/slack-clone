import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA2GMNbFaKrlHgiVwKdZU2_sLlLxUDOD3o",
    authDomain: "slackbysharjeel.firebaseapp.com",
    projectId: "slackbysharjeel",
    storageBucket: "slackbysharjeel.appspot.com",
    messagingSenderId: "1068773116746",
    appId: "1:1068773116746:web:f102309bffdc544b544fb3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };