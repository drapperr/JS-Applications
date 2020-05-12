import models from '../models/index.js';
import extend from '../utils/context.js';
import docModifier from '../utils/doc-modifier.js';

export default {
    get: {
        login(context) {
            extend(context).then(function () {
                this.partial('../views/user/login.hbs');
            });
        },
        register(context) {
            extend(context).then(function () {
                this.partial('../views/user/register.hbs');
            });
        },
        logout(context){
            models.user.logout().then(response=>{
                context.redirect('#/home');
            });
        },
        profile(context){
            models.idea.getAll()
            .then(response => {
                const ideas = response.docs.map(docModifier);
                let userId=localStorage.getItem('userId');
                let myIdeas=ideas.filter(x=>x.ownerId===userId).map(x=>x.title);
                context.myIdeas=myIdeas;
                context.countIdeas=myIdeas.length;
                context.username=localStorage.getItem('userEmail');
                extend(context).then(function () {
                    this.partial('../views/user/profile.hbs');
                });
            });
            
        }
    },
    post: {
        login(context) {
            const { username, password } = context.params;

            models.user.login(username, password)
                .then(response => {
                    context.user = response;
                    context.username = response.email;
                    context.isLoggedIn = true;
                    context.redirect('#/home');
                })
                .catch(console.error);
        },
        register(context) {
            const { username, password, rePassword } = context.params;

            if (password === rePassword) {
                models.user.register(username, password)
                    .then(response => {
                        context.redirect('#/home');
                    })
                    .catch(console.error);
            }
        }
    }
};