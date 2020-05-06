import extend from '../utils/context.js';
import models from '../models/index.js';
import docModifier from '../utils/doc-modifier.js';

export default {
    get: {
        dashboard(context) {
            models.pet.getAll()
                .then(response => {
                    const pets = response.docs.map(docModifier);
                    context.pets = [];
                    pets.forEach(pet => {
                        const isNotMyPet = pet.uId !== localStorage.getItem('userId');
                        context.pets.push({
                            ...pet,
                            isNotMyPet,
                        })
                    });
                    extend(context).then(function () {
                        this.partial('../views/pet/dashboard.hbs');
                    })
                });
        },
        add(context) {
            extend(context).then(function () {
                this.partial('../views/pet/create.hbs');
            });
        },
        myPets(context) {
            models.pet.getAll()
                .then(response => {
                    const pets = response.docs.map(docModifier);
                    const myId = localStorage.getItem('userId');
                    context.myPets = pets.filter(x => x.uId === myId);
                    extend(context).then(function () {
                        this.partial('../views/pet/mypets.hbs')
                    })
                });
        },
        details(context) {
            const { id } = context.params;
            models.pet.get(id).then(response => {
                const pet = docModifier(response);
                context.pet = pet;
                context.isMyPet = pet.uId === localStorage.getItem('userId')
                extend(context).then(function () {
                    this.partial('../views/pet/details.hbs')
                });
            }).catch(console.error);
        },
        filter(context) {
            const { type } = context.params;
            models.pet.getAll()
                .then(response => {
                    let pets = response.docs.map(docModifier);
                    if (type !== 'All') {
                        pets = pets.filter(x => x.category === type);
                    }
                    context.pets = [];
                    pets.forEach(pet => {
                        const isNotMyPet = pet.uId !== localStorage.getItem('userId');
                        context.pets.push({
                            ...pet,
                            isNotMyPet,
                        })
                    });
                    extend(context).then(function () {
                        this.partial('../views/pet/dashboard.hbs');
                    })
                });
        }
    },
    post: {
        add(context) {
            const data = {
                ...context.params,
                uId: localStorage.getItem('userId'),
                hearts: 0
            };

            models.pet.create(data)
                .then((response => {
                    context.redirect('#/pet/dashboard');
                })).catch(console.error);
        }
    },
    del: {
        delete(context) {
            const { id } = context.params;
            models.pet.delete(id).then(response => {
                context.redirect('#/pet/mypets');
            });
        }
    },
    put: {
        edit(context) {
            const { id, description } = context.params;

            models.pet.get(id)
                .then(response => {
                    const pet = docModifier(response);
                    pet.description = description;

                    return models.pet.update(id, pet);
                })
                .then(response => {
                    context.redirect(`#/pet/details/${id}`);
                })
                .catch(console.error)
        },
        giveheart(context) {
            const { id } = context.params;

            models.pet.get(id)
                .then(response => {
                    const pet = docModifier(response);
                    pet.hearts++;

                    return models.pet.update(id, pet);
                })
                .then(response => {
                    context.redirect(`#/pet/dashboard`);
                })
                .catch(console.error)
        }
    }
};