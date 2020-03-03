function solve(str){
    let newObj={};
    JSON.parse(str).forEach(el => {
        Object.assign(newObj,el)
    });

    return newObj;
}

solve(`[{"canMove": true},{"canMove":true, "doors": 4},{"capacity": 5}]`);