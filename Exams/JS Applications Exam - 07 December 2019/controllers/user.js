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
        logout(context) {
            models.user.logout().then(response => {
                context.redirect('#/home');
            });
        },
        profile(context) {
            context.myTreks = [];

            models.trek.getAll().then(response => {
                response.docs.forEach(e => {
                    let trek = docModifier(e);
                    if (trek.organizer === localStorage.getItem('userEmail')) {
                        context.myTreks.push(trek.location)
                    }
                    context.myTreksCount = context.myTreks.length;
                    extend(context).then(function () {
                        this.partial('../views/user/profile.hbs');
                    });
                });
            })
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