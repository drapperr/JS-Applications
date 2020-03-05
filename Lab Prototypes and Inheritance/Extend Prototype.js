function extendClass(classToExtend) {
    classToExtend.prototype.species='';
    classToExtend.prototype.toSpeciesString()= function(){
        return `I am a ${this.species}. ${this.toString()}`
    }
}
