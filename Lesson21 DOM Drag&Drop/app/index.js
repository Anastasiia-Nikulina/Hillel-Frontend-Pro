const unorderedList = document.querySelector(".unorderedList");
const submitBtn = document.querySelector(".submit-btn");
submitBtn.innerHTML = "Push it right now!"

const form = document.querySelector(".form");

const inputFields = document.querySelectorAll("input");

form.addEventListener("submit", (event) => {
	event.preventDefault();
	for (let i = 0; i < inputFields.length; i++) {
		const listItem = document.createElement("li");
		listItem.classList.add("list-item");
		listItem.innerHTML = `${i + 1}  ${inputFields[i].value}`;
		listItem.draggable = true;
		unorderedList.appendChild(listItem);
	}
});

unorderedList.addEventListener(`dragstart`, (event) => {
	event.target.classList.add(`selected`);
})

unorderedList.addEventListener(`dragend`, (event) => {
	event.target.classList.remove(`selected`);
});

unorderedList.addEventListener(`dragover`, (event) => {
	event.preventDefault();


	const activeElement = unorderedList.querySelector(`.selected`);
	const currentElement = event.target;

	const isMoveable = activeElement !== currentElement &&
		currentElement.classList.contains(`list-item`);


	if (!isMoveable) {
		return;
	}
	const nextElement = (currentElement === activeElement.nextElementSibling) ?
		currentElement.nextElementSibling :
		currentElement;

	unorderedList.insertBefore(activeElement, nextElement);
});

const getNextElement = (cursorPosition, currentElement) => {

	const currentElementCoord = currentElement.getBoundingClientRect();

	const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

	const nextElement = (cursorPosition < currentElementCenter) ?
		currentElement :
		currentElement.nextElementSibling;
	return nextElement;
};

