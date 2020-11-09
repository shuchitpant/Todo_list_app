import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC5BG1TNj6oIfmm9l5ry-6T8XHDAMPv0HA",
    authDomain: "lilpant-s-simple-todo-app.firebaseapp.com",
    databaseURL: "https://lilpant-s-simple-todo-app.firebaseio.com",
    projectId: "lilpant-s-simple-todo-app",
    storageBucket: "lilpant-s-simple-todo-app.appspot.com",
    messagingSenderId: "275822643299",
    appId: "1:275822643299:web:ba890027ca2e04c4935056"

});

const db = firebaseApp.firestore();

export default db;