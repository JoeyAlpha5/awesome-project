import * as firebase from 'firebase';
const firebaseConfig={
    apiKey: "AIzaSyD0EtweG_LpgOnneF7fzSKr9RiQnbjwleE",
    authDomain: "aurora-test-36b7b.firebaseapp.com",
    projectId: "aurora-test-36b7b",
    storageBucket: "aurora-test-36b7b.appspot.com",
    messagingSenderId: "853394410848",
    appId: "1:853394410848:web:c5490d9336aec030ec2205"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase}