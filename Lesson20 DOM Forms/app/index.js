const requester = document.forms.requester;

const password = requester.password;
const email = requester.email;
const confirmPas = requester.confirm;
const consent = requester.consent;

const autofocus = (element) => {
  if (element instanceof HTMLElement) {
    element.focus();
  }
};

autofocus(email);

requester.addEventListener("submit", (event) => {
  event.preventDefault();
  const result = document.querySelector(".result");

  if (checkError()) {
    console.log("error");
  } else {
    const form = new FormData(event.target);
    let arrayres = []
    Array.from(form.keys())
      .filter(key => form.get(key))
      .forEach(key =>
        arrayres = arrayres.concat(` ${key}: ${form.get(key)}; `));
    result.textContent = `${arrayres[0]} ${arrayres[1]}`
  }
});

validatePassword = (password, confirm) => {
  let hasErrors = false;
  if (password.value === "") {
    createErrorField(password, "Cannot be empty");
    hasErrors = true;
  }
  if (password.value.length < 9 || password.value.length > 24) {
    createErrorField(password, "Wrong length");
    hasErrors = true;

  }
  if (confirm.value === "") {
    createErrorField(confirm, "Cannot be empty");
    hasErrors = true;
    return hasErrors;
  }

  if (confirm.value !== password.value) {
    createErrorField(confirm, "Passwords do not match");
    hasErrors = true;
  }
  return hasErrors;

}

validateEmail = (target) => {
  let hasErrors = false;
  if (target.value === "") {
    createErrorField(target, "Cannot be empty");
    hasErrors = true;
    return hasErrors;
  }

  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!target.value.match(validRegex)) {
    createErrorField(target, "Wrong email");
    hasErrors = true;
  }
  return hasErrors;
}

validateConsent = (target) => {
  let hasErrors = false
  if (!target.checked) {
    createErrorField(target, "You must agree with our rules");
    hasErrors = true;
  }
  return hasErrors;
}

checkError = () => {
  const errors = requester.querySelectorAll('.error');

  for (let i = 0; i < errors.length; i++) {
    errors[i].innerHTML = "";
  }
  let hasErrors = validateEmail(email);
  hasErrors = validatePassword(password, confirmPas) || hasErrors;
  hasErrors = validateConsent(consent) || hasErrors;
  return hasErrors;
}


const createErrorField = (input, text) => {
  const error = input.parentElement.querySelector('span[role="alert"]');
  error.hidden = false;
  error.classList.add("error");
  error.innerHTML = text;
}