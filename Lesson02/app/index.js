let firstName = prompt("Your first name");
let lastName = prompt("Your last name");

let dayOfBirth = prompt("Day of birth");
let monthOfBirth = prompt("Month of birth");
let yearOfBirth = prompt("Year of birth");

const CURRENT_YEAR = 2022;

yearOfBirth = Number(yearOfBirth);
dayOfBirth = Number(dayOfBirth);
monthOfBirth = Number(monthOfBirth);
let age = CURRENT_YEAR - Number(yearOfBirth);


//calculating leap year//
let isLeapYear;
let leapMessage = "";

if (yearOfBirth % 400 === 0) {
    isLeapYear = true;
    leapMessage = " (leap year)";
} else if (yearOfBirth % 100 === 0) {
    isLeapYear = false;
    leapMessage = "";
} else if (yearOfBirth % 4 === 0) {
    isLeapYear = true;
    leapMessage = " (leap year)";
}

//calculating zodiac//
let zodiac;
let zodiacSymbol;

switch (monthOfBirth) {
    case 1:
        if (dayOfBirth >= 20) {
            zodiac = "Aquarius";
            zodiacSymbol = "&#9810;";
        }
        else {
            zodiac = "Capricorn";
            zodiacSymbol = "&#9809;";
        }
        break;

    case 2:
        if (dayOfBirth >= 19) {
            zodiac = "Pisces";
            zodiacSymbol = "&#9811;";
        }
        else {
            zodiac = "Aquarius";
            zodiacSymbol = "&#9810;";
        }
        break;

    case 3:
        if (dayOfBirth >= 21) {
            zodiac = "Aries";
            zodiacSymbol = "&#9800;";
        }
        else {
            zodiac = "Pisces";
            zodiacSymbol = "&#9811;";
        }
        break;

    case 4:
        if (dayOfBirth >= 20) {
            zodiac = "Taurus";
            zodiacSymbol = "&#9801;";
        }
        else {
            zodiac = "Aries";
            zodiacSymbol = "&#9800;";
        }
        break;

    case 5:
        if (dayOfBirth >= 21) {
            zodiac = "Gemini";
            zodiacSymbol = "&#9802;";
        }
        else {
            zodiac = "Taurus";
            zodiacSymbol = "&#9801;";
        }
        break;

    case 6:
        if (dayOfBirth >= 21) {
            zodiac = "Cancer";
            zodiacSymbol = "&#9803;";
        }
        else {
            zodiac = "Gemini";
            zodiacSymbol = "&#9802;";
        }
        break;

    case 7:
        if (dayOfBirth >= 23) {
            zodiac = "Leo";
            zodiacSymbol = "&#9804;";
        }
        else {
            zodiac = "Cancer";
            zodiacSymbol = "&#9803;";
        }
        break;

    case 8:
        if (dayOfBirth >= 23) {
            zodiac = "Virgo";
            zodiacSymbol = "&#9805;";
        }
        else {
            zodiac = "Leo";
            zodiacSymbol = "&#9804;";
        }
        break;

    case 9:
        if (dayOfBirth >= 23) {
            zodiac = "Libra";
            zodiacSymbol = "&#9806;";
        }
        else {
            zodiac = "Virgo";
            zodiacSymbol = "&#9805;";
        }
        break;

    case 10:
        if (dayOfBirth >= 23) {
            zodiac = "Scorpio";
            zodiacSymbol = "&#9807;";
        }
        else {
            zodiac = "Libra";
            zodiacSymbol = "&#9806;";
        }
        break;

    case 11:
        if (dayOfBirth >= 22) {
            zodiac = "Sagittarius";
            zodiacSymbol = "&#9808;";
        }
        else {
            zodiac = "Scorpio";
            zodiacSymbol = "&#9807;";
        }
        break;

    case 12:
        if (dayOfBirth >= 22) {
            zodiac = "Capricorn";
            zodiacSymbol = "&#9809;";
        }
        else {
            zodiac = "Sagittarius";
            zodiacSymbol = "&#9808;";
        }
        break;
}


let finalResponse = `User Bio: ${firstName} ${lastName}, ${age} years old${leapMessage}, ${zodiac} ${zodiacSymbol}`;

document.write(finalResponse);