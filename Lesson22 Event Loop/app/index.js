const alarm = document.forms.alarm;
const alarmMessage = document.createElement("span");
const reminderMessage = document.createElement("span");
const notification = document.querySelector(".notification");


const updateTime = () => setInterval(() => {
  const now = new Date();

  let hours = document.querySelector(".hours");
  let minutes = document.querySelector(".minutes");
  let seconds = document.querySelector(".seconds");


  hours.textContent = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  minutes.textContent = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  seconds.textContent = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

}, 1000);

updateTime();


class Alarm {
  timeIds = [];

  setAlarm = ((alarmInputs) => {
    const alarmTime = new Date();
    alarmTime.setHours(alarmInputs[0]);
    alarmTime.setMinutes(alarmInputs[1]);
    alarmTime.setSeconds(alarmInputs[2]);

    alarmMessage.innerHTML = "Alarm is activated";
    alarmMessage.classList.add("alarm-message")
    alarm.appendChild(alarmMessage);

    let timeId = setTimeout(() => {
      {
        notification.hidden = false;

        if (alarm.reminder.checked) {
          reminderMessage.innerHTML = "The alarm will be repeated in 24H";
          alarm.appendChild(reminderMessage);
          this.setReminder(3000);
        }
      }
    }, alarmTime - new Date());
    this.timeIds.push(timeId);
  })

  setReminder = (interval) => {

    let timeId = setInterval(() => {

      this.timeIds.push(timeId);
    }, interval)
  }

  clear = () => {
    while (this.timeIds.length != 0) {
      clearTimeout(this.timeIds.pop());
    }
    alarmMessage.innerHTML = "";
    notification.hidden = true;
  }
}

const alarmObj = new Alarm();

const alarmInputs = [];

alarm.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputs = alarm.elements;

  for (i = 0; i < inputs.length; i++) {
    if (inputs[i].nodeName === "INPUT" && inputs[i].type === "number") {
      alarmInputs.push(inputs[i].value);
    }
  }

  alarmObj.setAlarm(alarmInputs);

});

const resetButton = document.querySelector(".clear-alarm");
resetButton.addEventListener("click", (event) => {
  alarmObj.clear();
});
