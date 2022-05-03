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
	validateBirthYear(value) {
		const input = Number(value);
		return isNaN(input) || input < 1900 || input > 2010;
	},
	validateBirthMonth(value) {
		const input = Number(value);
		return isNaN(input) || input > 12;
	},
	validateBirthDay(value) {
		const input = Number(value);
		return isNaN(input) || input > 31;
	},
	validateName(input) {
		const value = String(input);
		return value === null || value.length < 2 || value.length > 20
	}

}


const getFullAge = (year, month, day) => {
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const birthDate = new Date(year, month, day);
	const currentbirthDate = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
	let age;
	age = today.getFullYear() - birthDate.getFullYear();
	if (today < currentbirthDate) {
		age = age - 1;
	} return age;
}


const firstName = STDIN.string('Enter your First Name', STDIN.validateName, true);
const lastName = STDIN.string('Enter your Last Name', STDIN.validateName, true);
const yearOfBirth = STDIN.number('Enter your birth year', STDIN.validateBirthYear, true);
const monthOfBirth = STDIN.number('Enter your birth month', STDIN.validateBirthMonth, true);
const dayOfBirth = STDIN.number('Enter your birth day', STDIN.validateBirthDay, true);


const spans = document.getElementsByTagName("span");
const userAge = getFullAge(yearOfBirth, monthOfBirth, dayOfBirth);
for (let elem of spans) {
	if (elem.closest(".user-list")) {
		switch (elem.innerHTML) {
			case "firstName":
				elem.innerHTML = firstName;
				break;
			case "lastName":
				elem.innerHTML = lastName;
				break;
			case "age":
				elem.innerHTML = userAge;
				break;
		}
	}
}

const body = document.body;
function forChildren(root) {
	let arr = [];
	for (let children of root.children) {
		arr.push(children.tagName);
		arr = arr.concat(forChildren(children));
	}
	return arr;
}



const names = forChildren(body);
console.log(names)
const tagList = document.querySelector('.tag-list');

const occurrences = names.reduce((acc, curr) =>
	(acc[curr] ? ++acc[curr] : acc[curr] = 1, acc)
	, {});

for (const [key, value] of Object.entries(occurrences)) {
	let el = (`${key}: ${value}`);
	let createEl = document.createElement("LI");
	createEl.innerHTML = el;
	tagList.appendChild(createEl);

}

