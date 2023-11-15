const grid = document.querySelector(".grid");
const timeLeft = document.querySelector(".time-left");
const score = document.querySelector(".result");
let squares = [];
let result = 0;
for (let i = 0; i < 9; i++) {
  squares[i] = document.createElement("div");
  squares[i].setAttribute("id", i);
  squares[i].classList.add("square");
  grid.append(squares[i]);
}
function randomSqaure() {
   squares.forEach((square) => {
    square.classList.remove('mole');
   })
  let ranomPosition = squares[Math.floor(Math.random() * 9)];
  ranomPosition.classList.add("mole");
}

setInterval(randomSqaure, 1000);
