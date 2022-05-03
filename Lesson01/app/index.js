var yearOfBirth = prompt("Year of birth");
var firstName = prompt("Your first name");
var lastName = prompt("Your last name");
const currentYear = 2022;

var age = currentYear - Number(yearOfBirth);

document.write("User Bio: " + firstName + " " + lastName +
 ", " + age + " years old.");