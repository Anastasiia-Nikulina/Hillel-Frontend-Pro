const auth = document.forms.auth;
const menu = document.querySelector(".menu-group");
const createNewNote = document.querySelector(".create-btn");
const logoutBtn = document.querySelector(".logout-btn");
const noteForm = document.forms['note-form'];
const inputField = noteForm.textarea;
const notesFormList = document.querySelector(".note-form-list");
const deleteBtn = document.querySelector(".delete-btn");
const deleteAllBtn = document.querySelector(".deleteAll-btn");


export class Notes {
    counter = 1;

    constructor(store, authObj) {
        this.setEventListeners();
        this.store = store;
        this.authObj = authObj;
        this.load();

        auth.addEventListener("submit", (event) => {
            event.preventDefault();
            this.authObj.checkInputs();
            this.load();
        });

    }

    load() {

        if (this.authObj.currentUser !== null) {
            const data = this.store.getState(this.authObj.currentUser.userId);
            data.then(arr => arr.forEach(row =>
                this.addNoteToList(row.title)))
        }
    }

    setEventListeners() {

        menu.addEventListener("click", (event) => {
            switch (event.target) {
                case createNewNote:
                    this.createNote();
                    break;

                case deleteBtn:
                    this.deleteNoteFromList();
                    break;

                case deleteAllBtn:
                    this.deleteAllNotes();
                    break;

                case logoutBtn:
                    document.cookie = `user = ; expires = Thu, 18 Dec 2010 12:00:00 UTC; path=/`;
                    location.reload();
                    break;
            }
        });

        noteForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const currentNote = this.addNoteToList("adding in process...");
            this.store.setState(this.authObj.currentUser.userId, inputField.value)
                .then(data =>
                    currentNote.innerHTML = `${this.counter - 1}: ${data.title}`)
                .catch(data =>
                    notesFormList.childNodes[this.counter - 2].remove());

            event.target.reset();
        });
    }

    createNote() {
        noteForm.style.display = "flex";
    }

    addNoteToList(input) {
        const listItem = document.createElement("li");
        listItem.classList.add("list-item");
        listItem.innerHTML = `${this.counter}: ${input}`;
        this.counter++;
        notesFormList.appendChild(listItem);
        return listItem;
    };

    deleteNoteFromList() {

        const elems = notesFormList.childNodes;
        if (!elems.length) {
            alert("Nothing to delete");
        } else if (elems !== undefined) {
            const deleteItem = Number(prompt("Please, enter the number of note you want to delete"));
            elems[deleteItem - 1].style.color = "rgba(129, 96, 81, 0.5)"

            this.store.deleteState(this.authObj.currentUser.userId, deleteItem)
                .then(data => elems[deleteItem - 1].remove())
                .catch(data => elems[deleteItem - 1].style.color = "black");

        }
    }

    deleteAllNotes() {
        const confirmDeleteNotes = confirm("Are you sure you want to delete all notes?");
        const elems = notesFormList.childNodes;
        if (confirmDeleteNotes === true && elems !== undefined) {
            notesFormList.replaceChildren();
            this.store.deleteAllStates(this.authObj.currentUser.userId)
            this.counter = 1;
        }
    }
}