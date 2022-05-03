const wrap = function (value, depth) {
    const obj = {};
    obj.someKey = depth <= 0 ? value : wrap(value, depth - 1);
    return obj;
}
const unwrap = function (target, key) {
    const tempResult = target[key];
    if (typeof tempResult === "object") {
        return unwrap(tempResult, key);
    } else {
        return tempResult;
    }
}

const randomInt = getRandomInt(5, 10);
const wrappedObj = wrap("hello", randomInt);
const result = unwrap(wrappedObj, "someKey");

console.log(wrappedObj);
console.log(result);


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
};

/* 
const exponentiate = function (a, n) {
   if (isNaN(Number(n))) {
        n = a;
   }
    if (n === 1) {
        return a;
    } else {
        return a * exponentiate (a, n-1);
    }
}


const int = 4;

const exponented = exponentiate(int);

console.log(exponented);
//console.log(Math.pow(exponented, 1/pow)); */

const now = new Date();

console.log(now.getTimezoneOffset());