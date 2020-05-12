import extend from '../utils/context.js';
import models from '../models/index.js';
import docModifier from '../utils/doc-modifier.js';

export default {
    get: {
        dashboard(context) {
            models.idea.getAll()
                .then(response => {
                    const ideas = response.docs.map(docModifier);

                    context.ideas = ideas;
                    extend(context).then(function () {
                        this.partial('../views/idea/dashboard.hbs');
                    })
                });
        },
        create(context) {
            extend(context).then(function () {
                this.partial('../views/idea/create.hbs');
            });
        },
        info(context) {
            const { id } = context.params;

            models.idea.get(id).then(response => {
                const idea = docModifier(response);

                Object.keys(idea).forEach(x => {
                    context[x] = idea[x];
                })
                context.isOwner = idea.ownerId === localStorage.getItem('userId');
                extend(context).then(function () {
                    this.partial('../views/idea/info.hbs')
                });
            }).catch(console.error);
        }
    },
    post: {
        create(context) {
            const data = {
                ...context.params,
                ownerId: localStorage.getItem('userId'),
                likes: 0,
                comments: []
            };

            models.idea.create(data)
                .then((response => {
                    context.redirect('#/idea/dashboard');
                })).catch(console.error);
        }
    },
    del: {
        delete(context) {
            const { id } = context.params;
            models.idea.delete(id).then(response => {
                context.redirect('#/idea/dashboard');
            });
        }
    },
    put: {
        comment(context) {
            const { id, newComment } = context.params;

            models.idea.get(id)
                .then(response => {
                    const idea = docModifier(response);
                    idea.comments.push(`${localStorage.getItem('userEmail')}: ${newComment}`);

                    return models.idea.update(id, idea);
                })
                .then(response => {
                    context.redirect(`#/idea/info/${id}`);
                })
                .catch(console.error)
        },
        like(context) {
            const { id } = context.params;

            models.idea.get(id)
                .then(response => {
                    const idea = docModifier(response);
                    idea.likes++;

                    return models.idea.update(id, idea);
                })
                .then(response => {
                    context.redirect(`#/idea/info/${id}`);
                })
                .catch(console.error)
        }
    }
};