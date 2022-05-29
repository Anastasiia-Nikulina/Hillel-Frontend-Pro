const auth = document.forms.auth;
const email = auth.email;
const password = auth.password;
const consent = auth.consent;
const userNotes = document.querySelector(".user-notes");
const menu = document.querySelector(".menu-group");
const createNewNote = document.querySelector(".create-btn");
const logoutBtn = document.querySelector(".logout-btn");
const userNotesAll = document.querySelector(".user-notes");
const noteHolder = document.querySelector(".note-holder");
const noteForm = document.querySelector(".note-form");
const inputField = document.querySelector("textarea");
const notesFormList = document.querySelector(".note-form-list");
const deleteBtn = document.querySelector(".delete-btn");
const deleteAllBtn = document.querySelector(".deleteAll-btn");
const errorSpan = document.createElement("span");
errorSpan.classList.add("error");



const usersTable = {
    "example@example.com": {
        firstName: "John",
        lastName: "Doe",
        email: "example@example.com",
        password: /* "super_secret" */ "111"
    },
    "demo@demo.com": {
        firstName: "Demo",
        lastName: "User",
        email: "demo@demo.com",
        password: /* "super_secret" */ "111"
    },
};

const getCookie = (name) => {
    for (const cookie of document.cookie.split(";").map((pair) => pair.trim())) {
        const [cookieName] = cookie.split("=");

        if (cookieName === name) {
            return cookie;
        }
    }

    return null;
}


const autofocus = (element) => {
    if (element instanceof HTMLElement) {
        element.focus();
    }
};

autofocus(email);

class Auth {
    currentUser;

    constructor() {
        this.currentUser = getCookie("user");

        if (this.currentUser !== null) {
            auth.style.display = "none";
            userNotes.hidden = false;
            const data = store.getState("note-form" + this.currentUser.email);

            for (const element in data) {
                this.addNoteToList(data[element].text);
            };
        }
    }

    checkInputs = () => {
        const form = new FormData(auth);

        this.currentUser = usersTable[form.get("email")];
        const passGetfromUser = form.get("password");

        if (this.currentUser !== undefined && this.currentUser.password === passGetfromUser) {
            auth.style.display = "none";
            userNotes.hidden = false;
            if (consent.checked === true) {
                document.cookie = `user = ${JSON.stringify(this.currentUser)}; expires = Thu, 18 Dec 2023 12:00:00 UTC; path=/`;

            }
            const data = store.getState("note-form" + this.currentUser.email);

            for (const element in data) {
                notes.addNoteToList(data[element].text);
            };


        } else {
            this.createError(this.currentUser === undefined ? "wrong email" : "wrong password");
        }
    }

    createError = (message) => {
        auth.appendChild(errorSpan);
        errorSpan.innerHTML = message;
    }
}


auth.addEventListener("submit", (event) => {
    event.preventDefault();
    authObj.checkInputs();
});

class Notes {
    counter = 1;

    constructor() {
        this.setEventListeners();
    }

    setEventListeners = () => {
        self = this;
        menu.addEventListener("click", (event) => {
            switch (event.target) {
                case createNewNote:
                    self.createNote();
                    break;

                case deleteBtn:
                    self.deleteNoteFromList();
                    break;

                case deleteAllBtn:
                    self.deleteAllNotes();
                    break;

                case logoutBtn:
                    document.cookie = `user = ; expires = Thu, 18 Dec 2010 12:00:00 UTC; path=/`;
                    location.reload();
                    break;
            }
        });

        noteForm.addEventListener("submit", (event) => {
            event.preventDefault();
            store.setState(event.target.name + authObj.currentUser.email, { id: new Date().toTimeString(), text: inputField.value });
            self.addNoteToList(inputField.value);

            event.target.reset()
        });
    }

    createNote = () => {
        noteForm.style.display = "flex";
    }

    addNoteToList = (input) => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-item");
        listItem.innerHTML = `${this.counter}: ${input}`;
        this.counter++;
        notesFormList.appendChild(listItem);
    };

    deleteNoteFromList = () => {

        const elems = notesFormList.childNodes;

        if (!elems.length) {
            alert("Nothing to delete");

        } else if (elems !== undefined) {
            const deleteItem = Number(prompt("Please, enter the number of note you want to delete"));
            elems[deleteItem - 1].remove();
            store.deleteState(noteForm.name + authObj.currentUser.email, deleteItem);
        }
    }

    deleteAllNotes = () => {
        const confirmDeleteNotes = confirm("Are you sure you want to delete all notes?");
        const elems = notesFormList.childNodes;
        if (confirmDeleteNotes === true && elems !== undefined) {
            notesFormList.replaceChildren();
            store.deleteAllStates(noteForm.name + authObj.currentUser.email)
            this.counter = 1;
        }
    }
}


class Store {

    getState(id) {
        const store = localStorage.getItem(id);

        if (!store) {
            const initStore = [];
            localStorage.setItem(id, JSON.stringify(initStore))
            return initStore;
        }
        return JSON.parse(store);
    }

    setState(id, value) {
        const state = this.getState(id);
        state.push(value);
        localStorage.setItem(id, JSON.stringify(state));

    }

    deleteState(id, index) {
        const state = this.getState(id);
        state.splice(index - 1, 1);
        localStorage.setItem(id, JSON.stringify(state));
    }

    deleteAllStates(id) {
        localStorage.removeItem(id);
    }
}


const authObj = new Auth();
const notes = new Notes();
const store = new Store();












