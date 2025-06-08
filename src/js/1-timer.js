import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const calendar = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button");

startBtn.disabled = true;
let userSelectedDate = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (selectedDates[0] < new Date()) {
            startBtn.disabled = true;
            iziToast.show({
                title: "Warning!",
                message: "Please choose a date in the future",
                color: `red`,
                position: `topCenter`,
            });
        } else {
            startBtn.disabled = false;
            userSelectedDate = selectedDates[0];
        }
        }
    }
  
flatpickr("#datetime-picker", options);

startBtn.addEventListener("click", startTimer);

function startTimer() {
    const timerId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = userSelectedDate - currentTime;
        if (deltaTime <= 0) {
            clearInterval(timerId);
            calendar.disabled = false;
            startBtn.disabled = true;
            update({ days: "00", hours: "00", minutes: "00", seconds: "00" });
            return;
        }
        update(convertMs(deltaTime));
        
    }, 1000)

    function convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
      
        const days = pad(Math.floor(ms / day));
        const hours = pad(Math.floor((ms % day) / hour));
        const minutes = pad(Math.floor(((ms % day) % hour) / minute));
        const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
      
        return { days, hours, minutes, seconds };
    }

    function pad(value) {
        return String(value).padStart(2, "0");
    }
    
    const updateTime = {
        days: document.querySelector("[data-days]"),
        hours: document.querySelector("[data-hours]"),
        minutes: document.querySelector("[data-minutes]"),
        seconds:document.querySelector("[data-seconds]")
    };

    function update({ days, hours, minutes, seconds }) {
        updateTime.days.textContent = days;
        updateTime.hours.textContent = hours;
        updateTime.minutes.textContent = minutes;
        updateTime.seconds.textContent = seconds;
    }
        
    startBtn.disabled = true;
    calendar.disabled = true;
}
