const moleRow = document.querySelector(".mole__row");
const moleCol = document.querySelectorAll(".mole__col");
const scoreEl = document.querySelector(".score");
const timeEl = document.querySelector(".time");
const startBtn = document.querySelector(".btn--start");
const containerBtn = document.querySelector(".container__btn");
const audioSmash = new Audio("../audio/hit-sound.mp3");
const audioBg = new Audio("../audio/bg-music.mp3");

let score = 0;
let gameStart;
let time = 10;

const getRandomMolePosition = () => {
  return Math.floor(Math.random() * moleRow.childElementCount);
};

const timer = () => {
  if (time <= 9) {
    timeEl.innerHTML = `Time Left: 0${time}s`;
  } else {
    timeEl.innerHTML = `Time Left: ${time}s`;
  }
  time--;
};

const addMoleInHole = () => {
  const molePosition = getRandomMolePosition();
  const img = document.createElement("img");
  img.src = "images/mole_image.png";
  img.classList.add("mole__image");
  moleCol[molePosition].append(img);
  img.addEventListener("click", () => {
    moleHit(molePosition, img);
  });
  setTimeout(() => {
    if (moleCol[molePosition].contains(img)) {
      moleCol[molePosition].removeChild(img);
    }
  }, 900);
};

const moleHit = (molePosition, img) => {
  audioSmash.play();
  score++;
  updateScore(score);
  moleCol[molePosition].removeChild(img);
};

const updateScore = (score) => {
  scoreEl.innerHTML = `Your Score: ${score}`;
};

const startGame = () => {
  audioBg.currentTime = 0;
  audioBg.play();
  containerBtn.classList.add("active");
  time = 10;
  score = 0;
  updateScore(score);
  gameStart = setInterval(() => {
    timer();
    addMoleInHole();
    if (time === -1) {
      audioBg.pause();
      containerBtn.classList.remove("active");
      clearInterval(gameStart);
    }
  }, 1000);
};

startBtn.addEventListener("click", startGame);
