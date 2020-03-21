function solve() {
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const regBtn = document.querySelector('#registerBUtton');
    const loginBtn = document.querySelector('#loginButton');
    const logoutBtn = document.querySelector('#logoutButton');
    const infoBtn = document.querySelector('#info');

    var firebaseConfig = {
        apiKey: "AIzaSyBBrU6vOWon2o8td7yPUprGDwaP6WB5EW8",
        authDomain: "softuni-myexercises.firebaseapp.com",
        databaseURL: "https://softuni-myexercises.firebaseio.com",
        projectId: "softuni-myexercises",
        storageBucket: "softuni-myexercises.appspot.com",
        messagingSenderId: "975823596615",
        appId: "1:975823596615:web:4ea44fc286961cccff1562"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    regBtn.addEventListener('click', register);
    loginBtn.addEventListener('click', login);
    logoutBtn.addEventListener('click', logout);
    infoBtn.addEventListener('click', getInfo);

    function register() {
        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
            .catch((error) => {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log(`${errorCode}:${errorMessage}`);
                // ...
            });
    }
    function getInfo(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                let displayName = user.displayName;
                let email = user.email;
                let emailVerified = user.emailVerified;
                let isAnonymous = user.isAnonymous;
                let uid = user.uid;
                console.log(displayName)
                console.log(email)
                console.log(emailVerified)
                console.log(isAnonymous)
                console.log(uid)
                // ...
            } else {
                console.log("Error")
            }
        })
    }
    function login() {
        firebase.auth().signInWithEmailAndPassword(email.value, password.value)
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(`${errorCode}: ${errorMessage}`)
                // ...
            })

    }

    function logout() {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });
    }
}