import controllers from '../controllers/index.js'

const app = Sammy('#root', function () {

    this.use('Handlebars', 'hbs');

    //Home
    this.get('#/home', controllers.home.get.home);

    //User
    this.get('#/login', controllers.user.get.login);
    this.get('#/register', controllers.user.get.register);

    this.post('#/login', controllers.user.post.login);
    this.post('#/register', controllers.user.post.register);
    this.get('#/logout', controllers.user.get.logout);

    //Catalog
    this.get('#/about', controllers.catalog.get.about);
    this.get('#/catalog', controllers.catalog.get.catalog);

    this.get('#/create', controllers.catalog.get.create);
    this.post('#/create', controllers.catalog.post.create);
    
    this.get('#/catalog/:id', controllers.catalog.get.details);

    this.get('#/join/:id', controllers.catalog.put.join);
    this.get('#/leave/:id', controllers.catalog.put.leave);

    this.get('#/edit/:id', controllers.catalog.get.edit);
    this.post('#/edit', controllers.catalog.put.edit);

    this.get('#/delete/:id',controllers.catalog.del.delete)
});


(() => {
    app.run('#/home');
})()