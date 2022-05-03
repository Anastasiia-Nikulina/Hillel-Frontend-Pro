let message = prompt("Enter your message here:");
let id = Number(prompt("Enter operation ID here (from 1 to 4):"));
let emojiArray = ["&#128512;", "&#128515;", "&#128516;", "&#128513;", "&#128518;", "&#128517;", "&#129315;",
    "&#128514;", "&#128578;", "&#128579;"];
let input = "";
let result = "";
let reg = /\s|\d/g;
const randomInt = getRandomIntInclusive(0, 10);

switch (id) {
    case 1:
        input = prompt("Enter any symbol here to know it's Unicode value:");
        result = "The Unicode value is: " + input.charCodeAt(0);
        break;

    case 2:
        input = Number(prompt(("Enter any number from 0 to ") + message.length + ":"));
        result = message.substring(0, input) + message.substring(input + 1);
        break;

    case 3:
        input = Number(prompt(("Enter any number from 0 to ") + message.length + ":"));
        result = message.substring(0, input) + emojiArray[randomInt] + message.slice(input + 1);
        break;

    case 4:
        result = message.replaceAll(reg, "").length;
        break;

    default:
        result = "Incorrect input";
}

console.log(result);


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


