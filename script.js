const experience = document.querySelector("#experience");
const celebration = document.querySelector("#celebration");
const questionArea = document.querySelector("#questionArea");
const answers = document.querySelector("#answers");
const yesButton = document.querySelector("#yesButton");
const noButton = document.querySelector("#noButton");
const playfulStatus = document.querySelector("#playfulStatus");
const petalRain = document.querySelector("#petalRain");
const replayButton = document.querySelector("#replayButton");
const finalMessage = document.querySelector("#finalMessage");

const teasingMessages = ["Uy, casi...", "Parece que el Sí es tímido.", "Ahora sí, prometido."];
let yesEscapes = 0;
let noTimer;

function setYesPosition(step) {
  const stage = answers.getBoundingClientRect();
  const button = yesButton.getBoundingClientRect();
  const maxX = Math.max(0, stage.width - button.width);
  const maxY = Math.max(0, stage.height - button.height);
  const positions = [
    [maxX, maxY * 0.1],
    [maxX * 0.34, maxY],
    [maxX * 0.62, maxY * 0.56],
  ];
  const [x, y] = positions[step];

  yesButton.style.setProperty("--yes-x", `${Math.round(x)}px`);
  yesButton.style.setProperty("--yes-y", `${Math.round(y)}px`);
}

function createPetals() {
  if (petalRain.childElementCount) return;

  const colors = ["#f2c94c", "#f8dc69", "#d58ca0", "#fff0a6"];
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < 24; index += 1) {
    const petal = document.createElement("i");
    petal.className = "falling-petal";
    petal.style.setProperty("--x", `${(index * 37) % 98}%`);
    petal.style.setProperty("--size", `${9 + (index % 5) * 3}px`);
    petal.style.setProperty("--rotation", `${(index * 47) % 180}deg`);
    petal.style.setProperty("--drift", `${-70 + (index % 7) * 23}px`);
    petal.style.setProperty("--duration", `${3.8 + (index % 6) * 0.42}s`);
    petal.style.setProperty("--delay", `${0.15 + (index % 8) * 0.13}s`);
    petal.style.setProperty("--petal-color", colors[index % colors.length]);
    fragment.appendChild(petal);
  }

  petalRain.appendChild(fragment);
}

function revealFlowers() {
  window.clearTimeout(noTimer);
  createPetals();
  celebration.setAttribute("aria-hidden", "false");
  experience.classList.add("is-revealed");
  window.setTimeout(() => finalMessage.focus({ preventScroll: true }), 1200);
}

function resetExperience() {
  window.clearTimeout(noTimer);
  experience.classList.remove("is-revealed");
  celebration.setAttribute("aria-hidden", "true");
  questionArea.classList.remove("show-no");
  yesEscapes = 0;
  yesButton.classList.remove("is-ready");
  yesButton.textContent = "Sí, quiero";
  yesButton.style.setProperty("--yes-x", "8px");
  yesButton.style.setProperty("--yes-y", "14px");
  playfulStatus.textContent = "";
  window.setTimeout(() => yesButton.focus({ preventScroll: true }), 450);
}

yesButton.addEventListener("click", () => {
  if (yesEscapes < 3) {
    setYesPosition(yesEscapes);
    playfulStatus.textContent = teasingMessages[yesEscapes];
    yesEscapes += 1;

    if (yesEscapes === 3) {
      yesButton.textContent = "Ahora sí 💛";
      yesButton.classList.add("is-ready");
    }
    return;
  }

  revealFlowers();
});

noButton.addEventListener("click", () => {
  questionArea.classList.add("show-no");
  noTimer = window.setTimeout(revealFlowers, 2600);
});

replayButton.addEventListener("click", resetExperience);

window.addEventListener("resize", () => {
  if (yesEscapes > 0 && yesEscapes < 3) {
    setYesPosition(yesEscapes - 1);
  }
}, { passive: true });
