import models from '../models/index.js';
import extend from '../utils/context.js';

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
        }
    },
    post: {
        login(context) {
            const { email, password } = context.params;

            models.user.login(email, password)
                .then(response => {
                    context.user = response;
                    context.username = response.email;
                    context.isLoggedIn = true;
                    context.redirect('#/home');
                })
                .catch(console.error);
        },
        register(context) {
            const { email, password, rePassword } = context.params;

            if (password === rePassword) {
                models.user.register(email, password)
                    .then(response => {
                        context.redirect('#/home');
                    })
                    .catch(console.error);
            }
        }
    }
};