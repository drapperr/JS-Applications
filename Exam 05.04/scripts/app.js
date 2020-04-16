import controllers from '../controllers/index.js'

const app = Sammy('#root', function () {

    this.use('Handlebars', 'hbs');

    //User
    this.get('#/login', controllers.user.get.login);
    this.get('#/register', controllers.user.get.register);

    this.post('#/login', controllers.user.post.login);
    this.post('#/register', controllers.user.post.register);
    this.get('#/logout', controllers.user.get.logout);

    //Articles
    this.get('#/home', controllers.article.get.home);
    this.get('#/create', controllers.article.get.create);
    this.post('#/create', controllers.article.post.create);
    this.get('#/details/:id',controllers.article.get.details);
    this.get('#/edit/:id',controllers.article.get.edit);
    this.post('#/edit/:id',controllers.article.put.edit);
    this.get('#/delete/:id',controllers.article.del.delete);
});


(() => {
    app.run('#/home');
})()