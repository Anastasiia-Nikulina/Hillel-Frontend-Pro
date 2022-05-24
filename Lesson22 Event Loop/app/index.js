const notification = document.querySelector(".notification");
const alarm = document.forms.alarm;
const resetButton = document.querySelector(".clear-alarm");

let hours = document.querySelector(".hours");
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");


const updateTime = () => setInterval(() => {
  const now = new Date();

  hours.textContent = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  minutes.textContent = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  seconds.textContent = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

}, 1000);

updateTime();

class Alarm {
  form;
  reminderMessage;
  alarmMessage;
  resetButton;
  timeIds = [];
  alarmInputs = [];
  notification;

  constructor(form, messageText, notification, resetButton) {
    this.form = form;
    this.messageText = messageText;
    this.notification = notification;
    this.resetButton = resetButton;
    this.alarmMessage = document.createElement("span");
    this.reminderMessage = document.createElement("span");

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const inputs = this.form.elements;

      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].nodeName === "INPUT" && inputs[i].type === "number") {
          this.alarmInputs.push(inputs[i].value);
        }
      }

      this.setAlarm(this.alarmInputs);

    });

    this.resetButton.addEventListener("click", (event) => {
      this.clear();
    });
  }

  setAlarm = ((alarmInputs) => {
    const alarmTime = new Date();
    alarmTime.setSeconds(alarmInputs.pop());
    alarmTime.setMinutes(alarmInputs.pop());
    alarmTime.setHours(alarmInputs.pop());

    this.alarmMessage.innerHTML = this.messageText;
    this.alarmMessage.classList.add("alarm-message")
    this.form.appendChild(this.alarmMessage);

    let timeId = setTimeout(() => {
      this.notification.hidden = false;

      if (this.form.reminder.checked) {
        this.reminderMessage.innerHTML = "The alarm will be repeated in 24H";
        this.reminderMessage.classList.add("reminder-message");
        this.form.appendChild(this.reminderMessage);
        this.setReminder(24*60*60*1000); //здесь изменяла время, чтобы проверить повтор сигнала
      }
      setTimeout(() => this.notification.hidden = true, 5000);
    }, alarmTime - new Date());
    this.timeIds.push(timeId);
  });

  setReminder = (interval) => {

    let timeId = setInterval(() => {
      this.notification.hidden = false
      setTimeout(() => this.notification.hidden = true, 5000);
    }, interval)
    this.timeIds.push(timeId);
  }

  clear = () => {
    while (this.timeIds.length != 0) {
      clearTimeout(this.timeIds.pop());
    }
    this.alarmMessage.innerHTML = "";
    this.notification.hidden = true;
    this.reminderMessage.innerHTML = "";
  }
}

const alarmObj = new Alarm(alarm, "The alarm is set", notification, resetButton);