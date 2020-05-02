import controllers from '../controllers/index.js'

const app = Sammy('#root', function () {

    this.use('Handlebars', 'hbs');

    //Home
    this.get('#/home', controllers.home.get.home);

    //User
    this.get('#/user/login', controllers.user.get.login);
    this.get('#/user/register', controllers.user.get.register);

    this.post('#/user/login', controllers.user.post.login);
    this.post('#/user/register', controllers.user.post.register);
    this.get('#/user/logout', controllers.user.get.logout);

    //Treks
    this.get('#/trek/create', controllers.trek.get.create);
    this.post('#/trek/create', controllers.trek.post.create);

    this.get('#/trek/:id', controllers.trek.get.details);

    this.get('#/trek/edit/:id', controllers.trek.get.edit);
    this.post('#/trek/edit/:id', controllers.trek.put.edit);

    this.get('#/trek/delete/:id',controllers.trek.del.delete);
    this.get('#/trek/like/:id', controllers.trek.put.like);


    this.get('#/user/profile',controllers.user.get.profile)

});


(() => {
    app.run('#/home');
})()