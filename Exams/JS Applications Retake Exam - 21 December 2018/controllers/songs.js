import extend from '../utils/context.js';
import models from '../models/index.js';
import docModifier from '../utils/doc-modifier.js';

export default {
    get: {
        allSongs(context) {

            models.songs.getAll()
                .then(response => {

                    const songs = response.docs.map(docModifier);

                    context.songs = songs;

                    songs.forEach((x, i) => {
                        context.songs[i].isOwner = songs[i].uId === localStorage.getItem('userId');
                    });
                    extend(context).then(function () {
                        this.partial('../views/songs/allSongs.hbs');
                    })
                });
        },
        mySongs(context) {
            models.songs.getAll()
                .then(response => {

                    const songs = response.docs.map(docModifier)
                        .filter(x => x.uId === localStorage.getItem('userId'));
                    context.songs = songs;
                    extend(context).then(function () {
                        this.partial('../views/songs/mySongs.hbs');
                    })
                });
        },
        addSong(context) {
            extend(context).then(function () {
                this.partial('../views/songs/createSong.hbs');
            });
        }
    },
    post: {
        addSong(context) {
            const data = {
                ...context.params,
                uId: localStorage.getItem('userId'),
                likes: 0,
                listened: 0,
                likesId: []
            };

            models.songs.create(data)
                .then((response => {
                    context.redirect('#/songs/allsongs');
                })).catch(console.error);
        }
    },
    del: {
        deleteSong(context) {
            const { id } = context.params;
            models.songs.delete(id).then(response => {
                context.redirect('#/songs/allsongs');
            });
        }
    },
    put: {
        listenSong(context) {
            const { id } = context.params;

            models.songs.get(id)
                .then(response => {
                    const song = docModifier(response);
                    song.listened += 1;

                    return models.songs.update(id, song);
                })
                .then(response => {
                    context.redirect('#/songs/allsongs')
                })
                .catch(console.error)
        },
        likeSong(context) {
            const { id } = context.params;

            models.songs.get(id)
                .then(response => {
                    const song = docModifier(response);

                    let hasLiked = song.likesId.includes(localStorage.getItem('userId'));
                    if (!hasLiked) {
                        song.likes += 1;
                        song.likesId.push(localStorage.getItem('userId'));
                    }

                    return models.songs.update(id, song);
                })
                .then(response => {
                    context.redirect('#/songs/allsongs')
                })
                .catch(console.error)
        }
    }
};