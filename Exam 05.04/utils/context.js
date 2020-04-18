export default function (context) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            context.isLoggedIn = true;
            localStorage.setItem('userEmail', user.email);
        } else {
            // User is signed out.
            context.isLoggedIn = false;
            localStorage.removeItem('userEmail');
        }
    });

    return context.loadPartials({
        header: '../views/common/header.hbs',
        footer: '../views/common/footer.hbs'
    })
}