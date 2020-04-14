let dbArticles= firebase.firestore().collection('articles');

export default{
    create(data){
        return dbArticles.add(data);
    },
    getAll(){
        return dbArticles.get();
    },
    get(id){
        return dbArticles.doc(id).get();
    },
    delete(id){
        return dbArticles.doc(id).delete();
    },
    update(id,data){
        return dbArticles.doc(id).update(data);
    }
};