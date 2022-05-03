const entries = [];
let entry = prompt("Enter any data here:");

while (entry !== null) {
    entries.push(entry);
    entry = prompt("Enter any data here:");        
};


let numbersResult = entries.map(function (item) {return Number(item)})
                            .filter(function (item) {return !isNaN(item)})
                            .reduce(function (total, item) {return total + item }, 0);
console.log(numbersResult);
                          
entries.filter(function (item) {return isNaN(Number(item))})
        .sort(function (a, b) { return b.length - a.length})
        .map(function(item) {return `[${item.length}]: ${item}`})
        .forEach(function(item) {console.log(item)});