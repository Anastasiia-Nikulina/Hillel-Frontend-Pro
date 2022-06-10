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
            const data = this.store.getState("note-form" + this.authObj.currentUser.email);

            for (const element in data) {
                this.addNoteToList(data[element].text);
            };
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
            this.store.setState(event.target.name + this.authObj.currentUser.email, { id: new Date().toTimeString(), text: inputField.value });
            this.addNoteToList(inputField.value);

            event.target.reset()
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
    };

    deleteNoteFromList() {

        const elems = notesFormList.childNodes;

        if (elems !== undefined) {
            const deleteItem = Number(prompt("Please, enter the number of note you want to delete"));
            elems[deleteItem - 1].remove();
            this.store.deleteState(noteForm.name + this.authObj.currentUser.email, deleteItem);
        } else if (!elems.length) {
            alert("Nothing to delete");
        }
    }

    deleteAllNotes() {
        const confirmDeleteNotes = confirm("Are you sure you want to delete all notes?");
        const elems = notesFormList.childNodes;
        if (confirmDeleteNotes === true && elems !== undefined) {
            notesFormList.replaceChildren();
            this.store.deleteAllStates(noteForm.name + this.authObj.currentUser.email)
            this.counter = 1;
        }
    }
}