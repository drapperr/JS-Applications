import extend from '../utils/context.js';
import models from '../models/index.js';
import docModifier from '../utils/doc-modifier.js';

export default {
    get: {
        create(context) {
            extend(context).then(function () {
                this.partial('../views/trek/create.hbs');
            });
        },
        details(context) {
            const { id } = context.params;

            models.trek.get(id).then(response => {
                const trek = docModifier(response);
                Object.keys(trek).forEach(key => {
                    context[key] = trek[key];
                })
                context.likes = trek.likesArray.length;
                context.isOwner = trek.organizer === localStorage.getItem('userEmail');
                extend(context).then(function () {
                    this.partial('../views/trek/info.hbs')
                });
            }).catch(console.error);
        },
        edit(context) {
            const { id } = context.params;

            models.trek.get(id).then(response => {
                const trek = docModifier(response);
                Object.keys(trek).forEach(key => {
                    context[key] = trek[key];
                })

                extend(context).then(function () {
                    this.partial('../views/trek/edit.hbs')
                });
            }).catch(console.error);

        }
    },
    post: {
        create(context) {
            const data = {
                ...context.params,
                organizer: localStorage.getItem('userEmail'),
                likesArray: []
            };

            models.trek.create(data)
                .then((response => {
                    context.redirect('#/home');
                })).catch(console.error);
        }
    },
    del: {
        delete(context) {
            const { id } = context.params;
            models.trek.delete(id).then(response => {
                context.redirect('#/home');
            });
        }
    },
    put: {
        edit(context) {
            const { id } = context.params;
            const data = { ...context.params };

            models.trek.update(id, data)
                .then(response => {
                    context.redirect('#/home')
                })
                .catch(console.error)
        },
        like(context) {
            const { id } = context.params;

            models.trek.get(id).then(response => {
                const trek = docModifier(response);
                if (!trek.likesArray.includes(localStorage.getItem('userEmail'))) {
                    trek.likesArray.push(localStorage.getItem('userEmail'));
                }
                models.trek.update(id, trek)
                .then(response => {
                    context.redirect(`#/trek/${id}`)
                })
                .catch(console.error)
            });
        }
    }
};