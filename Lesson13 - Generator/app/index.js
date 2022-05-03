const currentYear = new Date().getFullYear();

function* leapYears(inputYear = currentYear) {
    for (let year = 1900; year <= inputYear; year++) {
        if (new Date(year, 2, 0).getDate() > 28) 
        yield year;
    }
}

const yearsGenerator = leapYears(2001);

for (let iterator of yearsGenerator) {    
    console.log(iterator)
}

console.log("------------------")

function* counter() {
    let count1 = 1;
    let sum = 0;
    while (true) {

        let temp = yield sum;
        if (temp) {
            count1 = temp;
        }
        sum = sum + count1;
    }
}


const count = counter();

console.log(count.next()); // {value: 0, done: false}
console.log(count.next()); // {value: 1, done: false}
console.log(count.next(10)); // {value: 11, done: false}
console.log(count.next()); // {value: 21, done: false}
console.log(count.next()); // {value: 31, done: false}
console.log(count.next(100)); // {value: 131, done: false} 


console.log("------------------")


function* evens(maxCount) {
    for (let y = 2; y <= maxCount; y = y+2) {
            yield y;
    }
}

const even = evens(100);

console.log(even.next());
console.log(even.next());
console.log(even.next());
console.log(even.next());

console.log("------------------")

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function* randomEvens() {
    while (true) {
        let evenArray = new Array();
        let maxCount = getRandomIntInclusive(1, 20);
        let even2 = evens(maxCount);
        for (let i = 0; i < maxCount; i++) {
            evenArray.push(even2.next().value);
        }
        yield evenArray;
    }

}

const evens2 = randomEvens();
console.log(evens2.next());
console.log(evens2.next());
console.log(evens2.next());