
const STDIN = {

    number: getNumberFromUser = (message, validate, strict = true) => {
        let input;
        do {
            input = prompt(message);
            if ((input === null && strict)) {
                break;
            }
        } while (validate(input));
        return input;
    },

    string: getStringFromUser = (message, validate, strict = true) => {
        let input;
        do {
            input = prompt(message);
            if ((input === null && strict)) {
                break;
            }
        } while (validate(input));
        return input;
    },

}

const validateBirthYear = (value) => {
    const input = Number(value);
    return isNaN(input) || input < 1900 || input > 2010;
}
const validateBirthMonth = (value) => {
    const input = Number(value);
    return isNaN(input) || input > 12;
}
const validateBirthDay = (value) => {
    const input = Number(value);
    return isNaN(input) || input > 31;
}
const validateUserCount = (value) => {
    const input = Number(value);
    return isNaN(input) || input > 10;
}

const validateName = (input) => {
    const value = String(input);
    return value === null || value.length < 2 || value.length > 20
};

const DATE = {

    isLeapYear(year) {
        let birthYear = Number(year);
        let isLeapYear;

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
            isLeapYear = false;
        }
        return isLeapYear;
    },

    zodiac (month, day) {
        let zodiac;
        let birthMonth = Number(month);
        let birthDay = Number(day);

        if (birthMonth == 1 && birthDay >= 20 || birthMonth == 2 && birthDay <= 18) {
            return zodiac = "Aquarius";
        } else if (birthMonth == 2 && birthDay >= 19 || birthMonth == 3 && birthDay <= 20) {
            return zodiac = "Pisces";
        } else if (birthMonth == 3 && birthDay >= 21 || birthMonth == 4 && birthDay <= 19) {
            return zodiac = "Aries";
        } else if (birthMonth == 4 && birthDay >= 20 || birthMonth == 5 && birthDay <= 20) {
            return zodiac = "Taurus";
        } else if (birthMonth == 5 && birthDay >= 21 || birthMonth == 6 && birthDay <= 21) {
            return zodiac = "Gemini";
        } else if (birthMonth == 6 && birthDay >= 22 || birthMonth == 7 && birthDay <= 22) {
            return zodiac = "Cancer";
        } else if (birthMonth == 7 && birthDay >= 23 || birthMonth == 8 && birthDay <= 22) {
            return zodiac = "Leo";
        } else if (birthMonth == 8 && birthDay >= 23 || birthMonth == 9 && birthDay <= 22) {
            return zodiac = "Virgo";
        } else if (birthMonth == 9 && birthDay >= 23 || birthMonth == 10 && birthDay <= 22) {
            return zodiac = "Libra";
        } else if (birthMonth == 10 && birthDay >= 23 || birthMonth == 11 && birthDay <= 21) {
            return zodiac = "Scorpio";
        } else if (birthMonth == 11 && birthDay >= 22 || birthMonth == 12 && birthDay <= 21) {
            return zodiac = "Sagittarius";
        } else if (birthMonth == 12 && birthDay >= 22 || birthMonth == 1 && birthDay <= 19) {
            return zodiac = "Capricorn";
        } else value = "Wrong date";
    },

    maxDays (year, month) {
        let checkYear = DATE.isLeapYear(year);
        let max_birthDay = null;
        let birthMonth = Number(month);
        switch (birthMonth) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return max_birthDay = 31;
            case 2:
                if (checkYear) {
                    return max_birthDay = 29;
                } else {
                    return max_birthDay = 28;
                }
            case 4:
            case 6:
            case 9:
            case 11:
                return max_birthDay = 30;
        }
    }
}

const Employee = (firstName, lastName, year, month, day) => {
    let employeeObject = {
        firstName: firstName,
        lastName: lastName,
        year: year,
        month: month,
        day: day,

        getfullName() {
            return `${this.firstName} ${this.lastName}`;
        },

        getFullAge() {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const birthDate = new Date(this.year, this.month, this.day);
            const currentbirthDate = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
            let age;
            age = today.getFullYear() - birthDate.getFullYear();
            if (today < currentbirthDate) {
                age = age - 1;
            }
            return age;
        },

    }
    return employeeObject;
}


const APP = {
    archieve: new Set([]),
    allowed: ALLOWED_OPERATIONS = ["EXIT", "ADD", "DELETE", "SHOW_ALL"],
    exit() {
        console.log("Buy, Buy! See you later!");
        exitProgram = false;
    },
    addEntry() {

        const firstName = STDIN.string('Enter your First Name', validateName, true);
        const lastName = STDIN.string('Enter your Last Name', validateName, true);
        const yearOfBirth = STDIN.number('Enter your birth year', validateBirthYear, true);
        const monthOfBirth = STDIN.number('Enter your birth month', validateBirthMonth, true);
        const dayOfBirth = STDIN.number('Enter your birth day', validateBirthDay, true);
        const user = Employee(firstName, lastName, yearOfBirth, monthOfBirth, dayOfBirth);
        this.archieve.add(`User: ${user.getfullName()}, ${user.getFullAge()} y.o.`);

        console.log(`The user is added successfully. The total amount of users is now ${this.archieve.size}`);
    },

    deleteEntry() {
        const length = this.archieve.size;
        const arrayFromSet = Array.from(this.archieve);

        if (!length) {
            return console.log('EMPTY ARCHIVE');
        }

        const validate = (value) => {

            return value !== null && this.archieve.has(value)
        };

        const index = STDIN.number(`Enter index to be deleted: min 0, max ${length - 1}`, validateUserCount, true);

        const value = arrayFromSet[index];
        if (validate(value)) {
            this.archieve.delete(value);
            console.log("The user is deleted successfully");
        } else {
            console.log("Incorrect index");
        }
    },

    showEntries() {
        this.archieve.forEach((el, index) => {
            console.log(el);
        })
    },

    run() {
        let exitProgram = true;

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
                    APP.exit();
                    exitProgram = false;
                    break;

                case "ADD":
                    APP.addEntry();
                    break;

                case "DELETE":
                    APP.deleteEntry();
                    break;

                case "SHOW_ALL":
                    APP.showEntries();
                    break;
                default: console.log("Incorrect operation number");
            }

        } while (exitProgram);
    }
}

console.log(APP.run());
