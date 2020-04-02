let dbCauses= firebase.firestore().collection('teams');

export default{
    create(data){
        return dbCauses.add(data);
    },
    getAll(){
        return dbCauses.get();
    },
    get(id){
        return dbCauses.doc(id).get();
    },
    delete(id){
        return dbCauses.doc(id).delete();
    },
    update(id,data){
        return dbCauses.doc(id).update(data);
    }
};