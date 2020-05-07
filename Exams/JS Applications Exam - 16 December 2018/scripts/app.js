import controllers from '../controllers/index.js'

const app = Sammy('#site-content', function () {

    this.use('Handlebars', 'hbs');

    //Home
    this.get('#/home', controllers.home.get.home);

    //User
    this.get('#/user/login', controllers.user.get.login);
    this.get('#/user/register', controllers.user.get.register);

    this.post('#/user/login', controllers.user.post.login);
    this.post('#/user/register', controllers.user.post.register);
    this.get('#/user/logout', controllers.user.get.logout);

    //Pets
    this.get('#/pet/dashboard', controllers.pet.get.dashboard);
    this.get('#/pet/mypets', controllers.pet.get.myPets);
    this.get('#/pet/add', controllers.pet.get.add);
    this.post('#/pet/add', controllers.pet.post.add);
    this.post('#/pet/edit/:id',controllers.pet.put.edit)

    this.get('#/pet/details/:id',controllers.pet.get.details);
    this.get('#/pet/delete/:id',controllers.pet.del.delete);

    this.get('#/pet/giveheart/:id',controllers.pet.put.giveheart)
    
    this.get('#/filter/:type',controllers.pet.get.filter)

});


(() => {
    app.run('#/home');
})()