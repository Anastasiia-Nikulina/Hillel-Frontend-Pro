const getAddress = function (postcode, city, country, street, houseNumber, stroke) {
    let addressObj;
    if (stroke === null && stroke === undefined) {
        addressObj = {
            postcode: String(postcode),
            city: getLowercase(city),
            country: getLowercase(country),
            street: getLowercase(street),
            houseNumber: Number(houseNumber),
        }
    } else {
        addressObj = {
            postcode: String(postcode),
            city: getLowercase(city),
            country: getLowercase(country),
            street: getLowercase(street),
            houseNumber: Number(houseNumber),
            stroke: Number(stroke),
        }
    }
    return addressObj;
}

const getLowercase = function (input) {
    const inputString = String(input.toLowerCase());

    return inputString;

}

const getCapitalized = function (str) {
    const strCapital = str.substring(0, 1).toUpperCase() + str.substring(1, str.length);

    return strCapital;
}

const addressToString = function (address) {
    let buildingNumber = isNaN(address.stroke) ? address.houseNumber : address.houseNumber + "/" + address.stroke;

    return `${getCapitalized(address.street)} St, ${buildingNumber} @ ${address.postcode}, ${getCapitalized(address.city)}, ${getCapitalized(address.country)}`;
}

const stringToAddress = function (stringToSplit) {
    let trimmedArray = [];

    const arrayOfStrings = stringToSplit.split(/[@|,|/]/gi, stringToSplit.length);
    for (let i = 0; i < arrayOfStrings.length; i++) {
        trimmedArray.push(arrayOfStrings[i].trim());
    }
    console.log(trimmedArray);

    let addressParsed;
    let parsedCity;
    let parsedCountry;
    let parsedPostcode;
    let parsedStreet = trimmedArray[0].replace(" St", "");
    let parsedBuildingNumber = trimmedArray[1];;
    let parsedStroke;

    if (trimmedArray.length === 6) {
        parsedCity = trimmedArray[5];
        parsedCountry = trimmedArray[4];
        parsedPostcode = trimmedArray[3];
        parsedStroke = trimmedArray[2];
        addressParsed = getAddress(parsedPostcode, parsedCountry, parsedCity, parsedStreet, parsedBuildingNumber, parsedStroke);

    } else if (trimmedArray.length === 5) {
        parsedCity = trimmedArray[4];
        parsedCountry = trimmedArray[3];
        parsedPostcode = trimmedArray[2];
        parsedStroke = trimmedArray[1];
        addressParsed = getAddress(parsedPostcode, parsedCountry, parsedCity, parsedStreet, parsedBuildingNumber);
    }
    return addressParsed;

}

const address1 = getAddress("65045", "Odesa", "Ukraine", "Preobrazhenska", 60);
const address2 = getAddress("02000", "Kyiv", "Ukraine", "Khreshatyk", 17, 3);


console.log(address2.city) // -> 'kyiv';
console.log(address2.houseNumber) // -> 17;

const stringAddress = addressToString(address2);

console.log(stringAddress) // -> 'Khreschatyk St, 17 @ 02000, Kyiv, Ukraine';

const parsedAddress = stringToAddress(stringAddress);

console.log(parsedAddress.city) // -> 'kyiv';
console.log(parsedAddress.houseNumber) // -> 17
console.log(parsedAddress);