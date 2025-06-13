import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const promiseForm = document.querySelector(".form");
const delayInput = document.querySelector(`input[name="delay"]`);
const fulfilledBtn = document.querySelector(`input[value="fulfilled"]`);
const rejectedBtn = document.querySelector(`input[value="rejected"]`);

promiseForm.addEventListener("submit", handleForm);

function handleForm(event) {
    event.preventDefault();
    const delay = delayInput.value;
    const fulfilled = fulfilledBtn.checked;
    const rejected = rejectedBtn.checked;
    promiseForm.reset();
    
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (fulfilled) {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            };
            if (rejected) {
                reject(`❌ Rejected promise in ${delay}ms`)
            }
        }, delay);
    });

    promise
        .then(
            value => {
                iziToast.show({
                    message: value,
                    messageSize: `18`,
                    color: `green`,
                    position: `topCenter`,
                })
            })
        .catch(
            error => {
                iziToast.show({
                    message: error,
                    messageSize: `18`,
                    color: `red`,
                    position: `topCenter`,
                })
            });
}