
do {

    const CURRENT_YEAR = 2022;
    let birthYear = null;
    const min_birthYear = 1900;
    const max_birthYear = CURRENT_YEAR;
    let isLeapYear;
    let leapMessage = "";

    do {
        birthYearInput = prompt(`Enter your year of birth: only digits, from ${min_birthYear} to ${max_birthYear}:`, 1992);
        birthYear = Number(birthYearInput);

        if (birthYear % 400 === 0) {
            isLeapYear = true;
            leapMessage = "(leap year)";
        } else if (birthYear % 100 === 0) {
            isLeapYear = false;
            leapMessage = "";
        } else if (birthYear % 4 === 0) {
            isLeapYear = true;
            leapMessage = "(leap year)";
        }

    } while (birthYear < min_birthYear || birthYear > max_birthYear || isNaN(birthYear) || birthYearInput === null);

    //-------------

    const min_birthMonth = 1;
    const max_birthMonth = 12;
    let birthMonth = null;

    do {
        birthMonthInput = Number(prompt(`Enter your month of birth: only digits, from ${min_birthMonth} to ${max_birthMonth}:`, 5));
        birthMonth = birthMonthInput;
    } while (birthMonth < min_birthMonth || birthMonth > max_birthMonth || isNaN(birthMonth) || birthMonthInput === null);

    //-------------

    const min_birthDay = 1;
    let max_birthDay = null;
    let birthDay = null;

    switch (birthMonth) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            max_birthDay = 31;
            break;
        case 2:
            if (isLeapYear) {
                max_birthDay = 29;
            } else {
                max_birthDay = 28;
            }
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            max_birthDay = 30;
            break;
    }

    do {
        birthDayInput = Number(prompt(`Enter your day of birth: only digits, from ${min_birthDay} to ${max_birthDay}:`, 15));
        birthDay = birthDayInput;

    } while (birthDay < min_birthDay || birthDay > max_birthDay || isNaN(birthDay) || birthDayInput === null);



    let userName = "";

    do {
        userNameInput = prompt(`Enter your name: only letters, not exceeding 20 characters`, "Esther");
        userName = userNameInput;
    } while (userNameInput === null || userName.length < 1 || userName.length > 20);

    let userLastName = "";

    do {
        userLastNameInput = prompt(`Enter your last name: only letters, not exceeding 30 characters`, "Morwell");
        userLastName = userLastNameInput;
    } while (userLastNameInput === null || userLastName.length < 1 || userLastName.length > 20);



    let zodiac;
    let zodiacSymbol;


    
    switch (birthMonth) {
        case 1:
            if (birthDay >= 20) {
                zodiac = "Aquarius";
                zodiacSymbol = "&#9810;";
            }
            else {
                zodiac = "Capricorn";
                zodiacSymbol = "&#9809;";
            }
            break;

        case 2:
            if (birthDay >= 19) {
                zodiac = "Pisces";
                zodiacSymbol = "&#9811;";
            }
            else {
                zodiac = "Aquarius";
                zodiacSymbol = "&#9810;";
            }
            break;

        case 3:
            if (birthDay >= 21) {
                zodiac = "Aries";
                zodiacSymbol = "&#9800;";
            }
            else {
                zodiac = "Pisces";
                zodiacSymbol = "&#9811;";
            }
            break;

        case 4:
            if (birthDay >= 20) {
                zodiac = "Taurus";
                zodiacSymbol = "&#9801;";
            }
            else {
                zodiac = "Aries";
                zodiacSymbol = "&#9800;";
            }
            break;

        case 5:
            if (birthDay >= 21) {
                zodiac = "Gemini";
                zodiacSymbol = "&#9802;";
            }
            else {
                zodiac = "Taurus";
                zodiacSymbol = "&#9801;";
            }
            break;

        case 6:
            if (birthDay >= 21) {
                zodiac = "Cancer";
                zodiacSymbol = "&#9803;";
            }
            else {
                zodiac = "Gemini";
                zodiacSymbol = "&#9802;";
            }
            break;

        case 7:
            if (birthDay >= 23) {
                zodiac = "Leo";
                zodiacSymbol = "&#9804;";
            }
            else {
                zodiac = "Cancer";
                zodiacSymbol = "&#9803;";
            }
            break;

        case 8:
            if (birthDay >= 23) {
                zodiac = "Virgo";
                zodiacSymbol = "&#9805;";
            }
            else {
                zodiac = "Leo";
                zodiacSymbol = "&#9804;";
            }
            break;

        case 9:
            if (birthDay >= 23) {
                zodiac = "Libra";
                zodiacSymbol = "&#9806;";
            }
            else {
                zodiac = "Virgo";
                zodiacSymbol = "&#9805;";
            }
            break;

        case 10:
            if (birthDay >= 23) {
                zodiac = "Scorpio";
                zodiacSymbol = "&#9807;";
            }
            else {
                zodiac = "Libra";
                zodiacSymbol = "&#9806;";
            }
            break;

        case 11:
            if (birthDay >= 22) {
                zodiac = "Sagittarius";
                zodiacSymbol = "&#9808;";
            }
            else {
                zodiac = "Scorpio";
                zodiacSymbol = "&#9807;";
            }
            break;

        case 12:
            if (birthDay >= 22) {
                zodiac = "Capricorn";
                zodiacSymbol = "&#9809;";
            }
            else {
                zodiac = "Sagittarius";
                zodiacSymbol = "&#9808;";
            }
            break;
    }


    let finalResponse = `User Bio: ${userName} ${userLastName}, ${CURRENT_YEAR - birthYear} years old ${leapMessage}, 
${zodiac} ${zodiacSymbol}`;


    document.writeln(finalResponse);
    document.write("<br \/>");

    var doRepeat = confirm("Do you want to repeat the program?");

} while (doRepeat);

