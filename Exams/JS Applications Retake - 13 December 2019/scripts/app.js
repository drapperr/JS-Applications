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

    this.get('#/user/profile',controllers.user.get.profile);

    //Ideas
    this.get('#/idea/dashboard', controllers.idea.get.dashboard);
    this.get('#/idea/create', controllers.idea.get.create);
    this.post('#/idea/create', controllers.idea.post.create);
    this.get('#/idea/info/:id', controllers.idea.get.info);
    this.get('#/idea/delete/:id', controllers.idea.del.delete);
    
    this.post('#/idea/comment/:id',controllers.idea.put.comment);
    this.get('#/idea/like/:id',controllers.idea.put.like);

});


(() => {
    app.run('#/home');
})()