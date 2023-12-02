const grid = document.querySelector(".grid");
const result = document.getElementById("score");
const blockWidth = 100;
const blockHeight = 20;
const boxHeight = 300;
const boxWidth = 560;
const ballDiameter = 20;
let xDirection = -2;
let yDirection = -2;
let score = 0;
const userStartPosition = [270, 270];
const ballStartPosition = [300, 250];
let userCurrentPositon = userStartPosition;
let ballCurrentPosition = ballStartPosition;
class Block {
  constructor(xAxis, yAxis) {
    this.topLeft = [xAxis, yAxis];
    this.topRight = [xAxis + blockWidth, yAxis];
    this.bottomLeft = [xAxis, yAxis + blockHeight];
    this.bottomRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}
let blocks = [
  new Block(10, 10),
  new Block(120, 10),
  new Block(230, 10),
  new Block(340, 10),
  new Block(450, 10),
  new Block(10, 40),
  new Block(120, 40),
  new Block(230, 40),
  new Block(340, 40),
  new Block(450, 40),
  new Block(10, 70),
  new Block(120, 70),
  new Block(230, 70),
  new Block(340, 70),
  new Block(450, 70),
];
//Adding Blocks
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.top = blocks[i].topLeft[1] + "px";
    block.style.left = blocks[i].topLeft[0] + "px";
    grid.append(block);
  }
}
addBlocks();

//Adding SkateBoard
const user = document.createElement("div");
user.classList.add("user");
grid.appendChild(user);
user.style.left = userStartPosition[0] + "px";
user.style.top = userStartPosition[1] + "px";

function drawUser() {
  user.style.left = userCurrentPositon[0] + "px";
  user.style.top = userCurrentPositon[1] + "px";
}
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.top = ballCurrentPosition[1] + "px";
}
//Adding a Ball
const ball = document.createElement("div");
ball.classList.add("ball");
grid.append(ball);
ball.style.left = ballStartPosition[0] + "px";
ball.style.top = ballStartPosition[1] + "px";

function moveUser(e) {
  if (e.key === "ArrowLeft" && userCurrentPositon[0] > 0) {
    userCurrentPositon[0] -= 10;
    drawUser();
  } else if (e.key === "ArrowRight" && userCurrentPositon[0] < 460) {
    userCurrentPositon[0] += 10;
    drawUser();
  }
}

document.addEventListener("keydown", moveUser);

function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}
function checkForCollisions() {
  //check for bloks collisions
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1]  < blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].topLeft[1]
    ) {
      score++;
    const allBlocks = Array.from(document.querySelectorAll('.block'));
    allBlocks[i].classList.remove('block');
    blocks.splice(i , 1);
    result.innerHTML = "Score: " + score;
    changeDirectionForBlocks();
    }
  }
  if (ballCurrentPosition[0] >= boxWidth - ballDiameter) {
    changeDirection(1);
  } else if (ballCurrentPosition[1] <= 0) {
    changeDirection(2);
  } else if (ballCurrentPosition[0] <= 0) {
    changeDirection(3);
  }
  if (
    ballCurrentPosition[0] > userCurrentPositon[0] &&
    ballCurrentPosition[0] < userCurrentPositon[0] + 100 &&
    ballCurrentPosition[1] == 250
  ) {
    changeDirection(4);
  }
  if (ballCurrentPosition[1] >= boxHeight - ballDiameter) {
    clearInterval(timerId);
    result.innerHTML = "game over";
    document.removeEventListener("keydown", moveUser);
  }
  if(blocks.length == 0)
  {
    result.innerHTML = 'you win';
  }
}

function changeDirection(num) {
  if (xDirection === -2 && yDirection === -2 && num === 2) {
    yDirection = 2;
  } else if (xDirection === -2 && yDirection === -2 && num === 3) {
    xDirection = 2;
  } else if (xDirection === 2 && yDirection === -2 && num === 2) {
    yDirection = 2;
  } else if (xDirection === 2 && yDirection === 2 && num === 4) {
    yDirection = -2;
  } else if (xDirection === -2 && yDirection === 2 && num === 4) {
    yDirection = -2;
  } else if (xDirection === 2 && yDirection === -2 && num === 1) {
    xDirection = -2;
  } else if (xDirection === -2 && yDirection === 2 && num === 3) {
    xDirection = 2;
  } else if (xDirection === 2 && yDirection === 2 && num === 1) {
    xDirection = -2;
  }
}
function changeDirectionForBlocks()
{
  if(xDirection === -2 || xDirection === 2 && yDirection === -2)
  {
    yDirection = 2;
  }
  else if(xDirection === -2  || xDirection === 2 && yDirection === 2)
  {
    yDirection = -2
  }
}
let timerId = setInterval(moveBall, 20);
