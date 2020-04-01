import extend from '../utils/context.js';
import models from '../models/index.js';
import docModifier from '../utils/doc-modifier.js';

export default {
    get: {
        about(context) {
            extend(context).then(function () {
                this.partial('../views/about/about.hbs');
            });
        },
        catalog(context) {
            models.catalog.getAll()
                .then(response => {
                    const teams = response.docs.map(docModifier);
                    context.teams = teams;

                    context.hasNoTeam = true;

                    teams.forEach(team => {
                        if (localStorage.getItem('userEmail') === team.author) {
                            context.hasNoTeam = false;
                        }
                    });

                    extend(context).then(function () {
                        this.partial('../views/catalog/teamCatalog.hbs');
                    })
                });
        },
        create(context) {
            extend(context).then(function () {
                this.partial('../views/create/createPage.hbs');
            });
        },
        details(context) {
            const { id } = context.params;

            models.catalog.get(id).then(response => {
                const team = docModifier(response);
                Object.keys(team).forEach(x => {
                    context[x] = team[x];
                })

                context.isAuthor = localStorage.getItem('userEmail') === context.author;
                context.isOnTeam = false;

                context.members.forEach(m => {
                    if (m === localStorage.getItem('userEmail')) {
                        context.isOnTeam = true;
                    }
                });
                extend(context).then(function () {
                    this.partial('../views/catalog/details.hbs')
                });
            }).catch(console.error);
        },
        edit(context) {
            const {id}=context.params;
            localStorage.setItem('teamId',id);
            extend(context).then(function () {
                models.catalog.get(id).then(response => {
                    const team = docModifier(response);
                    context.name=team.name;
                    context.comment=team.comment;
                    this.partial('../views/edit/editPage.hbs');
                })
            });
        },
    },
    post: {
        create(context) {
            const userEmail = localStorage.getItem('userEmail');

            const data = {
                ...context.params,
                author: userEmail,
                members: [userEmail]
            };

            models.catalog.create(data)
                .then((response => {
                    context.redirect('#/catalog');
                })).catch(console.error);
        }
    },
    del:{
        delete(context) {
            const { id } = context.params;
            models.catalog.delete(id).then(response => {
                context.redirect('#/catalog');
            });
        }
    },
    put: {
        join(context) {
            const { id } = context.params;

            models.catalog.get(id)
                .then(response => {
                    const catalog = docModifier(response);
                    catalog.members.push(localStorage.getItem('userEmail'))

                    return models.catalog.update(id, catalog);
                })
                .then(response => {
                    context.redirect('#/catalog')
                })
                .catch(console.error)
        },
        leave(context) {
            const { id } = context.params;

            models.catalog.get(id)
                .then(response => {
                    const catalog = docModifier(response);
                    catalog.members = catalog.members.filter(x => x !== localStorage.getItem('userEmail'));

                    return models.catalog.update(id, catalog);
                })
                .then(response => {
                    context.redirect('#/catalog')
                })
                .catch(console.error)
        },
        edit(context) {
            const id=localStorage.getItem('teamId')
            const {name, comment } = context.params;
            
            models.catalog.get(id)
                .then(response => {
                    const team = docModifier(response);
                    team.name = name;
                    team.comment = comment;

                    return models.catalog.update(id, team);
                })
                .then(response => {
                    localStorage.removeItem('teamId');
                    context.redirect('#/catalog');
                })
                .catch(console.error)
        }
    }
};