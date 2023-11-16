const grid = document.querySelector(".grid");
const timeLeft = document.querySelector(".time-left");
const score = document.querySelector(".result");
let count = 0;
let squares = [];
let molePosition;
let result = 0;
let currentTime = 60;
let TimerId;
for (let i = 0; i < 9; i++) {
  squares[i] = document.createElement("div");
  squares[i].setAttribute("id", i);
  squares[i].classList.add("square");
  grid.append(squares[i]);
}
function randomSqaure() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });
  molePosition = Math.floor(Math.random() * 9);
  let ranomPosition = squares[molePosition];
  ranomPosition.classList.add("mole");
}

for (let i = 0; i < 9; i++) {
  squares[i].addEventListener("click", Whacked);
}
function Whacked() {
  if (this.id == molePosition) {
    count++;
    score.innerText = count;
  }
}
function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;
  if (currentTime == 0) {
    clearInterval(countDownTimerId);
    clearInterval(TimerId);
    alert("your score is " + count);
  }
}
TimerId = setInterval(randomSqaure, 1000);
let countDownTimerId = setInterval(countDown, 1000);
