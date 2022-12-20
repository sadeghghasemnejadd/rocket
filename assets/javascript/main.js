const lunchBtn = document.querySelector(".lunch");
const secondsContainer = document.querySelector(".seconds");
const abrotBtn = document.querySelector(".abort");
const restartBtn = document.querySelector(".restart");
const modal = document.querySelector(".modal");
const rocket = document.querySelector(".rocket");
const smoke = document.querySelector(".rocket__smoke");
let seconds = 10;
let enable = true;
let stopGame = false;
let finish = false;
const reset = () => {
  secondsContainer.textContent = "";
  abrotBtn.classList.add("abort-disable");
  abrotBtn.classList.remove("abort-enable");
  lunchBtn.classList.add("lunch-enable");
  lunchBtn.classList.remove("lunch-disable");
  restartBtn.classList.add("restart-disable");
  restartBtn.classList.remove("restart-enable");
  rocket.classList.remove("rocket-lunch-animation");
  smoke.classList.remove("smoke-lunch-animation");
  enable = false;
  modal.style.display = "none";
  stopGame = false;
};
const startTimer = () => {
  const interval = setInterval(() => {
    secondsContainer.textContent = seconds;
    seconds--;
    if (stopGame) clearInterval(interval);
    if (seconds < 0 || !enable) {
      clearInterval(interval);
      secondsContainer.textContent = "";
      abrotBtn.classList.remove("abort-enable");
      abrotBtn.classList.add("abort-disable");

      finishLunch();
    }
  }, 1000);
};
const finishLunch = () => {
  finish = true;
  enable = false;
  rocket.classList.add("rocket-lunch-animation");
  smoke.classList.add("smoke-lunch-animation");
  abrotBtn.classList.add("abort-disable");
  abrotBtn.classList.remove("abort-enable");
  lunchBtn.classList.remove("lunch-enable");
  lunchBtn.classList.add("lunch-disable");
  if (finish) {
    setTimeout(() => {
      secondsContainer.textContent = "Finish";
      restartBtn.classList.remove("restart-disable");
      restartBtn.classList.add("restart-enable");
    }, 10000);
  }
};
lunchBtn.addEventListener("click", () => {
  if (lunchBtn.classList.contains("lunch-disable")) return;
  lunchBtn.classList.remove("lunch-enable");
  lunchBtn.classList.add("lunch-disable");
  abrotBtn.classList.remove("abort-disable");
  abrotBtn.classList.add("abort-enable");
  enable = true;
  seconds = 10;
  startTimer();
});
abrotBtn.addEventListener("click", () => {
  if (abrotBtn.classList.contains("abort-disable")) return;
  modal.style.display = "flex";
  stopGame = true;
});
modal.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("modal__btn--yes") &&
    !e.target.classList.contains("modal__btn--no")
  )
    return;
  console.log(e.target);
  if (e.target.classList.contains("modal__btn--yes")) {
    reset();
  }
  if (e.target.classList.contains("modal__btn--no")) {
    stopGame = false;
    modal.style.display = "none";
    startTimer();
  }
});
restartBtn.addEventListener("click", reset);
