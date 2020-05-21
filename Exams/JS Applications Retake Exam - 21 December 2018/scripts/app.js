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

    //Songs
    this.get('#/songs/allsongs', controllers.songs.get.allSongs);
    this.get('#/songs/mysongs', controllers.songs.get.mySongs);
    this.get('#/songs/addsong', controllers.songs.get.addSong);

    this.post('#/songs/addsong', controllers.songs.post.addSong);

    this.get('#/songs/remove/:id',controllers.songs.del.deleteSong);
    this.get('#/songs/listen/:id',controllers.songs.put.listenSong);
    this.get('#/songs/like/:id',controllers.songs.put.likeSong);

});


(() => {
    app.run('#/home');
})()