(() => {
    const partials = {
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    };

    const app = new Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('#/home', loadHome);
        this.get('#/', loadHome);

        this.get('#/about', function (ctx) {
            getSessionInfo(ctx);
            this.loadPartials(partials)
                .then(function () {
                    this.partial('./templates/about/about.hbs')
                })
        });

        this.get('#/login', function (ctx) {
            getSessionInfo(ctx);
            partials['loginForm'] = './templates/login/loginForm.hbs';
            this.loadPartials(partials)
                .then(function () {
                    this.partial('./templates/login/loginPage.hbs')
                })
        });

        this.post('#/login', function (ctx) {
            const { username, password } = ctx.params;
            firebase.auth().signInWithEmailAndPassword(username, password)
                .then(response => {
                    firebase.auth().currentUser.getIdToken().then(token => {
                        sessionStorage.setItem('token', token);
                        sessionStorage.setItem('username', response.user.email);
                        this.redirect(['#/home']);
                    })
                })
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(`${errorCode}: ${errorMessage}`);
                });
        });

        this.get('#/register', function (ctx) {
            getSessionInfo(ctx);
            partials['registerForm'] = './templates/register/registerForm.hbs';
            this.loadPartials(partials)
                .then(function () {
                    this.partial('./templates/register/registerPage.hbs')
                })
        });

        this.post('#/register', function (ctx) {
            const { username, password, repeatPassword } = ctx.params;

            if (password !== repeatPassword) {
                return;
            }

            firebase.auth().createUserWithEmailAndPassword(username, password)
                .then(response => {
                    firebase.auth().currentUser.getIdToken().then(token => {
                        sessionStorage.setItem('token', token);
                        sessionStorage.setItem('username', response.user.email);
                        this.redirect(['#/home']);
                    })
                })
        });

        this.get('#/catalog', function (ctx) {
            getSessionInfo(ctx);
            let token = sessionStorage.getItem('token');
            partials['team'] = './templates/catalog/team.hbs';

            fetch('https://softuni-myexercises.firebaseio.com/teams.json?auth=' + token)
                .then(x => x.json())
                .then(data => {
                    let parsedData = [];
                    Object.entries(data).forEach(([key, value]) => {
                        value['_id'] = key;
                        parsedData.push(value);
                    });
                    ctx.teams = parsedData;
                    this.loadPartials(partials)
                        .then(function () {
                            this.partial('./templates/catalog/teamCatalog.hbs')
                        })
                })
        });

        this.get('#/catalog/:id', function (ctx) {
            getSessionInfo(ctx);
            const id = ctx.params.id;
            let token = sessionStorage.getItem('token');
            partials['teamMembers']='./templates/catalog/teamMember.hbs';
            partials['teamControls']='./templates/catalog/teamControls.hbs';
            fetch('https://softuni-myexercises.firebaseio.com/teams/' + id + '.json?auth=' + token)
            .then(x=>x.json())
            .then(teamInfo=>{
                ctx.name=teamInfo.name;
                ctx.comment=teamInfo.comment;
                this.loadPartials(partials)
                .then(function(){
                    this.partial('./templates/catalog/details.hbs');
                })
            })
        })

        this.get('#/create', function (ctx) {
            getSessionInfo(ctx);
            partials['createForm'] = './templates/create/createForm.hbs';

            this.loadPartials(partials)
                .then(function () {
                    this.partial('./templates/create/createPage.hbs')
                })
        })

        this.post('#/create', function (ctx) {

            const { name, comment } = ctx.params;
            let token = sessionStorage.getItem('token');
            fetch('https://softuni-myexercises.firebaseio.com/teams.json?auth=' + token, {
                method: 'POST',
                body: JSON.stringify({ name, comment })
            })
                .then(data => {
                    ctx.redirect('#/catalog')
                })
                .catch(console.log);
        })

        this.get('#/logout', function (ctx) {
            sessionStorage.clear();
            firebase.auth().signOut();
            ctx.redirect(['#/home']);
        });

        function loadHome(ctx) {
            getSessionInfo(ctx);
            this.loadPartials(partials)
                .then(function () {
                    this.partial('./templates/home/home.hbs')
                })
        }

        function getSessionInfo(ctx) {
            ctx.loggedIn = sessionStorage.getItem('token') !== null;
            ctx.username = sessionStorage.getItem('username');
        }
    });

    app.run();
})()