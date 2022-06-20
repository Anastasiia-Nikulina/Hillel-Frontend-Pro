const auth = document.forms.auth;
const email = auth.email;
const consent = auth.consent;
const userNotes = document.querySelector(".user-notes");
const errorSpan = document.createElement("span");
errorSpan.classList.add("error");


const autofocus = (element) => {
    if (element instanceof HTMLElement) {
        element.focus();
    }
};

autofocus(email);


const getCookie = (name) => {
    for (const cookie of document.cookie.split(";").map((pair) => pair.trim())) {
        const [cookieName, email] = cookie.split("=");

        if (cookieName === name) {
            return email;
        }
    }

    return null;
}

const usersTable = {
    "example@example.com": {
        userId: "1",
        firstName: "John",
        lastName: "Doe",
        email: "example@example.com",
        password: /* "super_secret" */ "111"
    },
    "demo@demo.com": {
        userId: "2",
        firstName: "Demo",
        lastName: "User",
        email: "demo@demo.com",
        password: /* "super_secret" */ "111"
    },
};


export class Auth {
    currentUser;

    constructor(store) {
        const userEmail = getCookie("user");
        if (userEmail !== null) {
            this.currentUser = usersTable[userEmail];
        } else {
            this.currentUser = null;
        }

        this.store = store;

        if (this.currentUser !== null) {
            auth.style.display = "none";
            userNotes.hidden = false;
        }
    }

    checkInputs() {
        const form = new FormData(auth);

        this.currentUser = usersTable[form.get("email")];
        const passGetfromUser = form.get("password");

        if (this.currentUser !== undefined && this.currentUser.password === passGetfromUser) {
            auth.style.display = "none";
            userNotes.hidden = false;
            if (consent.checked === true) {
                document.cookie = `user = ${this.currentUser.email}; expires = Thu, 18 Dec 2023 12:00:00 UTC; path=/`;
            }

        } else {
            this.createError(this.currentUser === undefined ? "wrong email" : "wrong password");
        }
    }

    createError = (message) => {
        auth.appendChild(errorSpan);
        errorSpan.innerHTML = message;
    }
}