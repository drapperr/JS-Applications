import extend from '../utils/context.js';
import models from '../models/index.js';
import docModifier from '../utils/doc-modifier.js';

export default {
    get: {
        dashboard(context) {
            models.cause.getAll()
                .then(response => {
                    const causes = response.docs.map(docModifier);

                    context.causes = causes;
                    extend(context).then(function () {
                        this.partial('../views/cause/dashboard.hbs');
                    })
                });
        },
        create(context) {
            extend(context).then(function () {
                this.partial('../views/cause/create.hbs');
            });
        },
        details(context) {
            const { causeId } = context.params;

            models.cause.get(causeId).then(response => {
                const cause = docModifier(response);
                context.cause = cause;
                context.canDonate = cause.uId !== localStorage.getItem('userId');

                extend(context).then(function () {
                    this.partial('../views/cause/details.hbs')
                });
            }).catch(console.error);
        }
    },
    post: {
        create(context) {
            const data = {
                ...context.params,
                uId: localStorage.getItem('userId'),
                collectedFunds: 0,
                donors: []
            };

            models.cause.create(data)
                .then((response => {
                    context.redirect('#/cause/dashboard');
                })).catch(console.error);
        }
    },
    del: {
        close(context) {
            const { causeId } = context.params;
            models.cause.delete(causeId).then(response => {
                context.redirect('#/cause/dashboard');
            });
        }
    },
    put: {
        donate(context) {
            const { causeId, currentDonation } = context.params;

            models.cause.get(causeId)
                .then(response => {
                    const cause = docModifier(response);
                    cause.collectedFunds += Number(currentDonation);
                    cause.donors.push(localStorage.getItem('userEmail'));

                    return models.cause.update(causeId,cause);
                })
                .then(response=>{
                    context.redirect('#/cause/dashboard')
                })
                .catch(console.error)
        }
    }
};