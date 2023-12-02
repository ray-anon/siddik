const grid = document.querySelector(".grid");
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 570;
const boardHeight = 300;
const ballDiameter = 20;
let timerId;
const userStart = [230, 270];
let currentPosition = userStart;
const ballStart = [270, 250];
let ballPosition = ballStart;
let xDirection = 2;
let yDirection = 2;
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis + blockHeight];
    this.bottomRight = [xAxis + blockWidth, yAxis + blockHeight];
    this.topLeft = [xAxis, yAxis];
    this.topRight = [xAxis + blockWidth, yAxis];
  }
}

const blocks = [
  new Block(10, 30),
  new Block(120, 30),
  new Block(230, 30),
  new Block(340, 30),
  new Block(450, 30),
  new Block(10, 60),
  new Block(120, 60),
  new Block(230, 60),
  new Block(340, 60),
  new Block(450, 60),
  new Block(10, 90),
  new Block(120, 90),
  new Block(230, 90),
  new Block(340, 90),
  new Block(450, 90),
];
console.log(blocks[0]);
function addBlock() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].topLeft[0] + "px";
    block.style.top = blocks[i].topLeft[1] + "px";
    grid.appendChild(block);
  }
}

addBlock();

const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);

function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.top = currentPosition[1] + "px";
}
function drawball() {
  ball.style.left = ballPosition[0] + "px";
  ball.style.top = ballPosition[1] + "px";
}
//move user Block
function moveUser(e) {
  if (currentPosition[0] == 470 && e.key == "ArrowRight") {
    return;
  } else if (currentPosition[0] == 0 && e.key == "ArrowLeft") {
    return;
  }
  if (e.key == "ArrowLeft") {
    currentPosition[0] = currentPosition[0] - 10;
    drawUser();
  } else if (e.key == "ArrowRight") {
    currentPosition[0] = currentPosition[0] + 10;
    drawUser();
  }
}
//moving the ball
function moveBall() {
  ballPosition[0] = ballPosition[0] - xDirection;
  ballPosition[1] = ballPosition[1] - yDirection;
  console.log(ballPosition);
  drawball();
  checkForCollisions();
}
timerId = setInterval(moveBall, 30);
document.addEventListener("keydown", moveUser);

const ball = document.createElement("div");
ball.classList.add("ball");
drawball();
grid.appendChild(ball);

function checkForCollisions() {
  if (ballPosition[0] == boardWidth - ballDiameter) {
    changeDirection();
  }
  if(ballPosition[1] == 0)
  {
    changeDirection();
  }
  if(ballPosition[0] == 0)
  {
    changeDirection();
  }
}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
  }
  if(xDirection == 2 && yDirection === -2)
  {
    xDirection = -2;
  }
}
