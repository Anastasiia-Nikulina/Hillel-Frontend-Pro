const USERS = [];
const ALLOWED_OPERATIONS = ["EXIT", "ADD", "DELETE", "SHOW_ALL"];
const CURRENT_YEAR = 2022;
let exitProgram = true;
let doRepeat;

do {

    let OPERATION = prompt(`Select from following operations: 
                                1. Exit the program; 
                                2. Add new user; 
                                3. Delete user from database; 
                                4. Show all entities of users; 
    Please, select a valid operation number:`);
    if (OPERATION === null) {
        OPERATION = 1;
    }
    else {
        OPERATION = Number(OPERATION);
    }

    switch (ALLOWED_OPERATIONS[OPERATION - 1]) {
        case "EXIT":
            console.log("Buy, Buy! See you later!");
            exitProgram = false;
            break;

        case "ADD":

            do {
                const user = [];
                let birthYear = null;
                const min_birthYear = 1900;
                const max_birthYear = CURRENT_YEAR;
                let isLeapYear = false;
                let yearType;

                do {
                    birthYearInput = prompt(`Enter your year of birth: only digits, from ${min_birthYear} to ${max_birthYear}:`, 1992);
                    birthYear = Number(birthYearInput);

                    if (birthYear % 4 == 0) {
                        if (birthYear % 100 == 0) {
                            if (birthYear % 400 == 0) {
                                isLeapYear = true;
                            } else {
                                isLeapYear;
                            }
                        } else {
                            isLeapYear = true;
                        }
                    } else {
                        isLeapYear;
                    }

                    yearType = isLeapYear ? (" (is leap year)") : ("");

                } while (birthYear < min_birthYear || birthYear > max_birthYear || isNaN(birthYear) || birthYearInput === null);
                user.push(birthYear);
                user.push(yearType);

                //-------------

                const min_birthMonth = 1;
                const max_birthMonth = 12;
                let birthMonth = null;

                do {
                    birthMonthInput = prompt(`Enter your month of birth: only digits, from ${min_birthMonth} to ${max_birthMonth}:`, 5);
                    birthMonth = Number(birthMonthInput);

                } while (birthMonth < min_birthMonth || birthMonth > max_birthMonth || isNaN(birthMonth) || birthMonthInput === null);
                user.push(birthMonth);


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
                    birthDayInput = prompt(`Enter your day of birth: only digits, from ${min_birthDay} to ${max_birthDay}:`, 15);
                    birthDay = Number(birthDayInput);
                } while (birthDay < min_birthDay || birthDay > max_birthDay || isNaN(birthDay) || birthDayInput === null);
                user.push(birthDay);

                let userName = "";

                do {
                    userName = prompt(`Enter your name: only letters, not exceeding 20 characters`, "Esther");                    
                } while (userName === null || userName.length < 1 || userName.length > 20);
                user.push(userName);

                let userLastName = "";

                do {
                    userLastName = prompt(`Enter your last name: only letters, not exceeding 30 characters`, "Morwell");                 
                } while (userLastName === null || userLastName.length < 1 || userLastName.length > 20);
                user.push(userLastName);


                let zodiac;
                let zodiacSymbol;

                switch (birthMonth) {
                    case 1:
                        if (birthDay >= 20) {
                            zodiac = "Aquarius";
                            zodiacSymbol = "♒";
                        }
                        else {
                            zodiac = "Capricorn";
                            zodiacSymbol = "♑";
                        }
                        break;

                    case 2:
                        if (birthDay >= 19) {
                            zodiac = "Pisces";
                            zodiacSymbol = "♓";
                        }
                        else {
                            zodiac = "Aquarius";
                            zodiacSymbol = "♒";
                        }
                        break;

                    case 3:
                        if (birthDay >= 21) {
                            zodiac = "Aries";
                            zodiacSymbol = "♈";
                        }
                        else {
                            zodiac = "Pisces";
                            zodiacSymbol = "♓";
                        }
                        break;

                    case 4:
                        if (birthDay >= 20) {
                            zodiac = "Taurus";
                            zodiacSymbol = "♉";
                        }
                        else {
                            zodiac = "Aries";
                            zodiacSymbol = "♈";
                        }
                        break;

                    case 5:
                        if (birthDay >= 21) {
                            zodiac = "Gemini";
                            zodiacSymbol = "♊";
                        }
                        else {
                            zodiac = "Taurus";
                            zodiacSymbol = "♉";
                        }
                        break;

                    case 6:
                        if (birthDay >= 21) {
                            zodiac = "Cancer";
                            zodiacSymbol = "♋";
                        }
                        else {
                            zodiac = "Gemini";
                            zodiacSymbol = "♊";
                        }
                        break;

                    case 7:
                        if (birthDay >= 23) {
                            zodiac = "Leo";
                            zodiacSymbol = "♌";
                        }
                        else {
                            zodiac = "Cancer";
                            zodiacSymbol = "♋";
                        }
                        break;

                    case 8:
                        if (birthDay >= 23) {
                            zodiac = "Virgo";
                            zodiacSymbol = "♍";
                        }
                        else {
                            zodiac = "Leo";
                            zodiacSymbol = "♌";
                        }
                        break;

                    case 9:
                        if (birthDay >= 23) {
                            zodiac = "Libra";
                            zodiacSymbol = "♎";
                        }
                        else {
                            zodiac = "Virgo";
                            zodiacSymbol = "♍";
                        }
                        break;

                    case 10:
                        if (birthDay >= 23) {
                            zodiac = "Scorpio";
                            zodiacSymbol = "♏";
                        }
                        else {
                            zodiac = "Libra";
                            zodiacSymbol = "♎";
                        }
                        break;

                    case 11:
                        if (birthDay >= 22) {
                            zodiac = "Sagittarius";
                            zodiacSymbol = "♐";
                        }
                        else {
                            zodiac = "Scorpio";
                            zodiacSymbol = "♏";
                        }
                        break;

                    case 12:
                        if (birthDay >= 22) {
                            zodiac = "Capricorn";
                            zodiacSymbol = "♑";
                        }
                        else {
                            zodiac = "Sagittarius";
                            zodiacSymbol = "♐";
                        }
                        break;
                }
                user.push(zodiac);
                user.push(zodiacSymbol);
                USERS.push(user);

                doRepeat = confirm("Do you want to add another user?");
            } while (doRepeat);
            break;

        case "DELETE":
            if (USERS.length === 0) {
                console.log("The archive is empty. Please, add users first");

            } else {
                let deleteInput = Number(prompt(`Users archive has ${USERS.length} entities. 
                Enter the user index you want to delete: (from 0 to ${USERS.length - 1})`));

                console.log(`User ${USERS[deleteInput][4]} ${USERS[deleteInput][5]} is successfully deleted`);
                USERS.pop([deleteInput]);
            }
            break;

        case "SHOW_ALL":
            if (USERS.length === 0) {
                console.log("The archive is empty. Please, add users first");

            } else {
                let indexOfUser = 0;
                for (let count = 0; count < USERS.length; count++) {
                    console.log(`User ${indexOfUser}: ${USERS[count][4]} ${USERS[count][5]}, ${CURRENT_YEAR - USERS[count][0]} years old${USERS[count][1]}, ${USERS[count][6]} ${USERS[count][7]}`);
                    indexOfUser++;
                }
            }
            break;

        default:   
            console.log("Incorrect operation number");            
            
    }

} while (exitProgram);









