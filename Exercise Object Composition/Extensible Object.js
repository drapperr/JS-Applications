function solve() {
    let myObj = {
        __proto__: {},
        extend: function(temp) {
            Object.keys(temp).forEach((key) => {
                if (typeof temp[key] === 'function') {
                    this.__proto__[key] =  temp[key];
                } else {
                    myObj[key] = temp[key];
                }
            })
        }
    };
    return myObj;
}

solve