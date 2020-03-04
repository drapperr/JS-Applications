function arrayMap(arr,func){
    debugger;
    return arr.reduce((acc,item)=>{
         acc.push(func.call(this,item));
            return acc;
    },[]);
}


let nums = [1,2,3,4,5];
console.log(arrayMap(nums,(item)=> item * 2)); 

