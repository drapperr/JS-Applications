import extend from '../utils/context.js';
import models from '../models/index.js';
import docModifier from '../utils/doc-modifier.js';

export default {
    get: {
        home(context) {
            models.article.getAll().then(response => {
                let jsArticles = [];
                let cSharpArticles = [];
                let javaArticles = [];
                let pytonArticles = [];

                for (const obj of response.docs) {
                    let article = docModifier(obj);

                    switch (article.category.toLowerCase()) {
                        case 'javascript':
                            jsArticles.push(article);
                            break;
                        case 'c#':
                            cSharpArticles.push(article);
                            break;
                        case 'java':
                            javaArticles.push(article);
                            break;
                        case 'pyton':
                            pytonArticles.push(article);
                            break;
                        default:
                            break;
                    }
                }
                context.jsArticles = jsArticles.sort((a,b)=>b.title.localeCompare(a));
                context.cSharpArticles = cSharpArticles.sort((a,b)=>b.title.localeCompare(a));
                context.javaArticles = javaArticles.sort((a,b)=>b.title.localeCompare(a));
                context.pytonArticles = pytonArticles.sort((a,b)=>b.title.localeCompare(a));

                extend(context).then(function () {
                    this.partial('../views/article/home.hbs');
                })
            }).catch(console.error);
        },
        create(context) {
            extend(context).then(function () {
                this.partial('../views/article/create.hbs');
            });
        },
        details(context) {
            const { id } = context.params;

            models.article.get(id).then(response => {
                const article = docModifier(response);
                context.article = article;
                context.isCreator = article.creator === localStorage.getItem('userEmail');

                extend(context).then(function () {
                    this.partial('../views/article/details.hbs')
                });
            }).catch(console.error);
        },
        edit(context) {
            const { id } = context.params;

            models.article.get(id).then(response => {
                const article = docModifier(response);
                context.article = article;

                extend(context).then(function () {
                    this.partial('../views/article/edit.hbs')
                });
            }).catch(console.error);
        }
    },
    post: {
        create(context) {
            const data = {
                ...context.params,
                creator: localStorage.getItem('userEmail'),
            };

            models.article.create(data)
                .then((response => {
                    context.redirect('#/home');
                })).catch(console.error);
        }
    },
    del: {
        delete(context) {
            const { id } = context.params;
            models.article.delete(id).then(response => {
                context.redirect('#/home');
            });
        }
    },
    put: {
        edit(context) {
            const { id } = context.params;

            models.article.update(id, {...context.params})
                .then(response => {
                    context.redirect('#/home')
                })
                .catch(console.error)
        }
    }
};