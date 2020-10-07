//selector
const settings_btn = document.getElementById("btn_settings");
const countdown_container = document.querySelector(".countdown_container");
const settings_container = document.querySelector(".settings_container");
const close_btn = document.querySelector(".exit");
const submit_btn = document.querySelector(".submit");
const titleInput = document.getElementById("count_title");
const inputD = document.getElementById("s_days");
const inputH = document.getElementById("s_hours");
const inputM = document.getElementById("s_mins");
const inputS = document.getElementById("s_secs");

const outputD = document.getElementById("days");
const outputH = document.getElementById("hours");
const outputM = document.getElementById("mins");
const outputS = document.getElementById("secs");

//eventListner
settings_btn.addEventListener("click", settingsUp);
close_btn.addEventListener("click", settingsClose);
submit_btn.addEventListener("click", submitCount);

//function
function settingsUp() {
  settings_container.classList.add("up");
}

function settingsClose(event) {
  event.preventDefault();
  settings_container.classList.remove("up");
}

function submitCount(event) {
  event.preventDefault();
  const titleCount = document
    .getElementById("countdown_title")
    .getElementsByTagName("h1")[0];
  titleCount.textContent =
    titleInput.value !== "" ? titleInput.value : "Créer un compte à rebours";
  settings_container.classList.remove("up");
  titleInput.value = "";
  getCountDown(inputD.value, inputH.value, inputM.value, inputS.value);
  inputD.value = 0;
  inputH.value = 0;
  inputM.value = 0;
  inputS.value = 0;
}

function getCountDown(days, hours, minuts, seconds) {
  let timer =
    (parseInt(seconds, 10) +
      parseInt(minuts, 10) * 60 +
      parseInt(hours, 10) * 60 * 60 +
      parseInt(days, 10) * 60 * 60 * 24) *
    1000;

  console.log(timer);

  let x = setInterval(function () {
    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(timer / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timer % (1000 * 60)) / 1000);
    console.log(days, hours, minutes, seconds);
    timer -= 1000;

    // Output the result in an element with id="demo"
    outputD.innerText = days;
    outputH.innerText = hours;
    outputM.innerText = minutes;
    outputS.innerText = seconds;
    // If the count down is over, write some text
    if (timer < 0) {
      clearInterval(x);
    }
  }, 1000);
}
